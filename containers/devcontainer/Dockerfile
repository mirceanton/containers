ARG MISE_VERSION=2025.1.15@sha256:5847d099105099c9cf26c0aabea0fa8574e381c223663c501ecdbb713fe6b36c
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
