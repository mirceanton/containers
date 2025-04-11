FROM node:23-bookworm-slim
ARG VERSION
ARG TARGETARCH

# Install common utilities
RUN apt-get update \
    && apt-get install -y \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g \
        @commitlint/cli@${VERSION} \
        @commitlint/config-conventional@${VERSION}

ENTRYPOINT ["/bin/bash"]
