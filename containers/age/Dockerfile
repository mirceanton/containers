ARG VERSION=v1.2.0

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/go:1.23-bookworm@sha256:2e00578e7c526e76ebd51597260928d8542d27c17ffe6390d79200638c51a3e6 AS builder

ARG VERSION
ARG TARGETPLATFORM
ARG TARGETARCH
ARG TARGETOS

# Clone the github repository
RUN git clone https://github.com/FiloSottile/age
WORKDIR /go/age
RUN git checkout ${VERSION}

# Build the task binary
ENV GOOS=$TARGETOS
ENV GOARCH=$TARGETARCH
ENV CGO_ENABLED=0
RUN go build -o "/age" -ldflags "-X main.Version=$VERSION" -trimpath ./cmd/age

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=builder --chmod=555 /age /age
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/age"]
