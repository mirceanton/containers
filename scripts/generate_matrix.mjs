import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Octokit } from '@octokit/rest';

// Configuration from environment variables
const GITHUB_OWNER = process.env.GITHUB_REPOSITORY.split('/')[0];
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_EVENT_NAME = process.env.GITHUB_EVENT_NAME;
const GITHUB_REF = process.env.GITHUB_REF;

const octokit = new Octokit({ auth: GITHUB_TOKEN });
const defaultTags = ["latest"]
const defaultPlatforms = ["linux/amd64"]
function getPullRequestNumber(ref) {
    const match = ref.match(/^refs\/pull\/(\d+)\/merge$/);
    return match ? match[1] : null;
}

function parseMetadata(metadataPath) {
    if (!fs.existsSync(metadataPath)) {
        throw new Error(`Metadata file not found: ${metadataPath}`);
    }
    const content = fs.readFileSync(metadataPath, 'utf8');
    return yaml.load(content);
}

async function generateMatrix() {
    const basePath = 'containers';
    const matrix = [];

    const isPullRequest = GITHUB_EVENT_NAME === 'pull_request';
    const prNumber = isPullRequest ? getPullRequestNumber(GITHUB_REF) : null;

    for (const folder of fs.readdirSync(basePath)) {
        const folderPath = path.join(basePath, folder);
        const dockerfilePath = path.join(folderPath, 'Dockerfile');
        const metadataPath = path.join(folderPath, 'metadata.yaml');

        if (fs.statSync(folderPath).isDirectory() && fs.existsSync(dockerfilePath)) {
            try {
                const metadata = parseMetadata(metadataPath);
                const imageName = metadata.image.name
                const imageTags = metadata.image.tags || defaultTags;
                const platforms = metadata.platforms || defaultPlatforms;

                for (const tag of imageTags) {
                    const fullVersion = isPullRequest ? `pr-${prNumber}-${tag}` : tag;

                    console.info(`Adding image ${imageName}:${fullVersion} to the job matrix.`);
                    matrix.push({
                        job_name: `${imageName}-${fullVersion}`,
                        image_name: `ghcr.io/${GITHUB_OWNER}/${imageName}`,
                        platforms: platforms.join(','),
                        image_tags: imageTags.join(','),
                        context: folderPath,
                        dockerfile: dockerfilePath,
                    });
                }
            } catch (error) {
                console.error(`Error processing folder ${folderPath}: ${error.message}`);
                process.exit(1);
            }
        }
    }

    console.log(`Job matrix: ${JSON.stringify({ include: matrix }, null, 2)}`);

    fs.writeFile('matrix.json', JSON.stringify({ include: matrix }, null, 2), err => {
        if (err) {
            console.error('Failed to write matrix to file:', err);
        } else {
            console.log('Matrix dumped to file successfully.');
        }
    });
}

generateMatrix().catch(error => {
    console.error('Error generating matrix:', error);
    process.exit(1);
});
