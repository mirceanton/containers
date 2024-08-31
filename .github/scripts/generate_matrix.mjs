/**
 * generate_matrix.js
 *
 * This script generates a matrix of Docker images to build and push to GitHub Container Registry (GHCR).
 * It performs the following tasks:
 *
 * 1. **Extracts Tool Versions**:
 *    - Reads `Dockerfile` in each subdirectory under the `containers` directory.
 *    - Extracts the version of the tool specified in the `ARG VERSION` line of the `Dockerfile`.
 *    - Throws an error if the `ARG VERSION` line is missing or cannot be parsed.
 *
 * 2. **Checks if Image Version Exists**:
 *    - Uses the GitHub REST API to check if a Docker image with the specified version already exists on GHCR.
 *    - Retrieves all available versions of the package from GHCR.
 *    - Compares the extracted version with the list of existing versions to determine if it needs to be built.
 *
 * 3. **Generates a Build Matrix**:
 *    - Constructs a matrix of images to build based on the versions that do not already exist on GHCR.
 *    - Formats the matrix in JSON to be used by GitHub Actions for subsequent build jobs.
 *
 * **Environment Variables**:
 * - `GITHUB_OWNER`: The GitHub Container Registry images owner
 * - `GITHUB_TOKEN`: A GitHub token with permissions to access the GHCR and the repository.
 *
 * **Usage**:
 * - This is meant to be ran in a GitHub Actions workflow to generate a matrix for a downstream job.
 */

import fs from 'fs'
import path from 'path'
import { Octokit } from '@octokit/rest'

// Configuration from environment variables
const GITHUB_OWNER = process.env.GITHUB_REPOSITORY.split('/')[0];
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_EVENT_NAME = process.env.GITHUB_EVENT_NAME;
const GITHUB_REF = process.env.GITHUB_REF;


const octokit = new Octokit({ auth: GITHUB_TOKEN });

function extractVersion(dockerfilePath) {
    const content = fs.readFileSync(dockerfilePath, 'utf8');
    const match = content.match(/^ARG VERSION=(.*)$/m);
    if (!match) {
        throw new Error(`Version not found in Dockerfile: ${dockerfilePath}`);
    }
    return match[1].trim();
}

async function imageExists(image_name, version) {
    try {
        const response = await octokit.request('GET /orgs/{org}/packages/container/{package_name}/versions', {
            org: GITHUB_OWNER,
            package_name: image_name,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        for (const ver of response.data) {
            if (ver.metadata.container.tags.includes(version)) {
                return true
            }
        }
        return false
    } catch (error) {
        return false
    }
}

function getPullRequestNumber(ref) {
    const match = ref.match(/^refs\/pull\/(\d+)\/merge$/);
    return match ? match[1] : null;
}

async function generateMatrix() {
    const basePath = 'containers';
    const matrix = [];

    const isPullRequest = GITHUB_EVENT_NAME === 'pull_request';
    const prNumber = isPullRequest ? getPullRequestNumber(GITHUB_REF) : null;

    for (const folder of fs.readdirSync(basePath)) {
        const image_name = folder;
        const folderPath = path.join(basePath, folder);
        const dockerfilePath = path.join(folderPath, 'Dockerfile');

        if (fs.statSync(folderPath).isDirectory() && fs.existsSync(dockerfilePath)) {
            try {
                let version = extractVersion(dockerfilePath);
                const exists = await imageExists(image_name, version);

                if (exists) {
                    console.info(`Image ${image_name}:${version} already exists. Skipping build.`);
                } else {
                    if (isPullRequest) {
                        version = `pr-${prNumber}-${version}`;
                    }
                    console.info(`Addingg image ${image_name}:${version} to the job matrix.`);
                    matrix.push({
                        job_name: image_name,
                        image_name: `ghcr.io/${GITHUB_OWNER}/${image_name}`,
                        context: folderPath,
                        dockerfile: dockerfilePath,
                        version: version
                    });
                }
            } catch (error) {
                console.error(`Error processing Dockerfile in ${folderPath}: ${error.message}`);
                process.exit(1);
            }
        }
    }
    console.log(`Job matrix: ${JSON.stringify({ include: matrix }, null, 2)}`)

    fs.writeFile('matrix.json', JSON.stringify({ include: matrix }, null, 0), err => {
        if (err) {
            console.log("Failed to write matrix to file.")
            console.error(err);
        } else {
            console.log("Matrix dumped to file successfully.")
        }
    });
}

generateMatrix().catch(error => {
    console.error('Error generating matrix:', error);
    process.exit(1);
});
