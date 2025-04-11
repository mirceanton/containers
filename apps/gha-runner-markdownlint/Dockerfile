FROM node:23-bookworm-slim
ARG VERSION
ARG TARGETARCH

# Install common utilities
RUN apt-get update \
    && apt-get install -y \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g markdownlint-cli@${VERSION}

ENTRYPOINT ["/bin/bash"]
