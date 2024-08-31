ARG VERSION=2024.8.1

# =================================================================================================
# BUILDER STAGE
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm AS build

ARG VERSION
ARG TARGETPLATFORM
ARG TARGETARCH
ARG TARGETOS

WORKDIR /app
COPY build.sh .
RUN bash build.sh
RUN mv /app/clients/apps/cli/dist/bw /app/bw

# =================================================================================================
# PRODUCTION STAGE
# =================================================================================================
FROM scratch
USER 8675:8675
COPY --from=build /app/bw /usr/local/bin/bw
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/usr/local/bin/bw"]
