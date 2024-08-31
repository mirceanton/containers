ARG VERSION=v1.2.0

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/go:1.22-bookworm AS builder

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
RUN go build -o "/age-keygen" -ldflags "-X main.Version=$VERSION" -trimpath ./cmd/age-keygen

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=builder --chmod=555 /age-keygen /age-keygen
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/age-keygen"]
