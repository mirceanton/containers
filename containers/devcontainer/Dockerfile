ARG MISE_VERSION=2025.1.14
FROM docker.io/jdxcode/mise:${MISE_VERSION} AS mise

# =================================================================================================
# Main image
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/base:bookworm
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
