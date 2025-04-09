ARG VERSION
FROM koalaman/shellcheck:${VERSION} AS shellcheck

FROM ubuntu:24.04
ARG TARGETARCH

# Install common utilities
RUN apt-get update \
    && apt-get install -y \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=shellcheck /bin/shellcheck /usr/local/bin/shellcheck
ENTRYPOINT ["/bin/bash"]
