FROM python:3.13-slim-bookworm
ARG VERSION
ARG TARGETARCH

# Install common utilities
RUN apt-get update \
    && apt-get install -y \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install yamllint==${VERSION}

ENTRYPOINT ["/bin/bash"]
