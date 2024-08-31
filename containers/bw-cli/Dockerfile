ARG VERSION=2024.8.1

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm AS build

ARG VERSION
ARG TARGETPLATFORM
ARG TARGETARCH
ARG TARGETOS

# Clone the github repository
WORKDIR /app
RUN git clone https://github.com/bitwarden/clients

# Install the root-level dependencies
WORKDIR /app/clients
RUN git checkout cli-v${VERSION}
RUN npm install

# Install CLI dependencies
WORKDIR /app/clients/apps/cli
RUN npm install

# Build the CLI
RUN npm run build:oss && \
    pkg . --targets node18-linux-x64 --outuput=./dist/bw && \
    mv ./dist/bw /app/bw

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=build /app/bw /usr/local/bin/bw
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/usr/local/bin/bw"]
