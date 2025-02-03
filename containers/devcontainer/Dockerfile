ARG MISE_VERSION=2025.2.1@sha256:b879fe9817ae3cad6d96280f012457f54810bc55b6a0a73361f6752980aa8ebf
FROM docker.io/jdxcode/mise:${MISE_VERSION} AS mise

# =================================================================================================
# Main image
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/base:bookworm@sha256:6155a486f236fd5127b76af33086029d64f64cf49dd504accb6e5f949098eb7e
COPY --from=mise /usr/local/bin/mise /usr/local/bin/mise
ENV EDITOR=vim

# Install additional OS packages
USER root
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt upgrade -y && \
    apt install -y sudo git vim curl wget unzip htop net-tools iputils-ping dnsutils libc6 fish && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=""

# Set up dev env
USER vscode
WORKDIR /home/vscode
COPY files/ ./.config
RUN mise install
ENTRYPOINT [ "/usr/bin/fish" ]
