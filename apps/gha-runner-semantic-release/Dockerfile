FROM node:23-bookworm-slim
ARG VERSION
ARG TARGETARCH

# Install common utilities
RUN apt-get update \
    && apt-get install -y \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g semantic-release@${VERSION} \
        @semantic-release/commit-analyzer \
        @semantic-release/release-notes-generator \
        @semantic-release/github

ENTRYPOINT ["/bin/bash"]
