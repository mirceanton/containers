ARG TASKFILE_VERSION=v3.38.0

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/go:1.22-bookworm AS builder

ARG TASKFILE_VERSION
ARG TARGETOS
ARG TARGETARCH

# Setup goreleaser
RUN echo 'deb [trusted=yes] https://repo.goreleaser.com/apt/ /' | sudo tee /etc/apt/sources.list.d/goreleaser.list && \
    sudo apt update && sudo apt install -y goreleaser

# Clone the github repository
RUN git clone https://github.com/go-task/task
WORKDIR /go/task
RUN git checkout ${TASKFILE_VERSION}

# Build the task binary
ENV GOOS=$TARGETOS
ENV GOARCH=$TARGETARCH
ENV CGO_ENABLED=0
RUN goreleaser build --single-target

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=builder --chmod=555 /go/task/task /task
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/task"]
