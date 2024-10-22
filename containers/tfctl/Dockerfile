ARG VERSION=v0.16.0-rc.4

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/go:1.23-bookworm@sha256:a3403234ec01e5383f63414aabfd3e2703a4c1e44b260354495c6f1e8cdc7594 AS builder

ARG VERSION
ARG TARGETPLATFORM
ARG TARGETARCH
ARG TARGETOS

# Clone the github repository
RUN git clone https://github.com/flux-iac/tofu-controller
WORKDIR /go/tofu-controller
RUN git checkout ${VERSION}

# Build the task binary
ENV GOOS=$TARGETOS
ENV GOARCH=$TARGETARCH
ENV CGO_ENABLED=0
RUN go build -ldflags="-s -w -X main.BuildSHA={{.ShortCommit}} -X main.BuildVersion={{.Tag}}" -trimpath -o /go/tfctl ./cmd/tfctl

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=builder --chmod=555 /go/tfctl /tfctl
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/tfctl"]
