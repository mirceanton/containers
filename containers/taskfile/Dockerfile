ARG TASKFILE_VERSION=v3.38.0

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/go:1.22-bookworm AS builder
ARG TASKFILE_VERSION

# Clone the github repository
RUN git clone https://github.com/go-task/task

# Build the task binary
WORKDIR /go/task
RUN git checkout ${TASKFILE_VERSION}
ENV CGO_ENABLED=0
RUN go build -trimpath -ldflags "-s -w" -o task

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=builder --chmod=555 /go/task/task /task
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/task"]
