ARG VERSION=v3.38.0

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/go:1.23-bookworm@sha256:a3403234ec01e5383f63414aabfd3e2703a4c1e44b260354495c6f1e8cdc7594 AS builder

ARG VERSION
ARG TARGETPLATFORM
ARG TARGETARCH
ARG TARGETOS

# Setup goreleaser
RUN echo 'deb [trusted=yes] https://repo.goreleaser.com/apt/ /' | sudo tee /etc/apt/sources.list.d/goreleaser.list && \
    sudo apt update && sudo apt install -y goreleaser

# Clone the github repository
RUN git clone https://github.com/go-task/task
WORKDIR /go/task
RUN git checkout ${VERSION}

# Build the task binary
ENV GOOS=$TARGETOS
ENV GOARCH=$TARGETARCH
ENV CGO_ENABLED=0
RUN goreleaser build --single-target --clean --verbose --output=/go/task/dist/task

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=builder --chmod=555 /go/task/dist/task /task
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/task"]
