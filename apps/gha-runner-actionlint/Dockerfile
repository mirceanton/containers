ARG VERSION
FROM rhysd/actionlint:${VERSION} as actionlint

FROM ubuntu:24.04
ARG TARGETARCH

# Install common utilities
RUN apt-get update && \
    apt-get install -y \
        git \
        curl \
        wget \
        ca-certificates \
        jq \
        build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=actionlint /usr/local/bin/actionlint /usr/local/bin/actionlint
ENTRYPOINT ["/bin/bash"]
