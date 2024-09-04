ARG VERSION=2024.8.1

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm AS build

ARG VERSION
RUN echo "Building Bitwarden CLI v${VERSION}"

ARG TARGETARCH
RUN if [[ "$TARGETARCH" == "amd64" ]]; then export ARCH="x64"; fi
RUN if [[ "$TARGETARCH" == "arm64" ]]; then export ARCH="arm64"; fi
RUN if [[ "$ARCH" == "" ]]; then echo "Unsupported architecture: $TARGETARCH" && exit 1; fi
RUN echo "Building for arch ${ARCH}"

ARG TARGETOS
RUN echo "Building for os ${TARGETOS}"

# Install dependencies
RUN npm install -g pkg

# Clone the github repository
WORKDIR /app
RUN git clone https://github.com/bitwarden/clients
WORKDIR /app/clients
RUN git checkout cli-v${VERSION}

# Install dependencies
RUN npm install
WORKDIR /app/clients/apps/cli
RUN npm install

# Build the binary
RUN npm run build:oss

# Package the binary
RUN pkg . --targets node18-${TARGETOS}-${ARCH} --output=/bw

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=build /bw /bw
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/bw"]
