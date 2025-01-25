ARG MISE_VERSION=2025.1.14
FROM docker.io/jdxcode/mise:${MISE_VERSION} AS mise

# =================================================================================================
# Main image
# =================================================================================================
FROM mcr.microsoft.com/devcontainers/base:bookworm
ENV EDITOR=vim
USER vscode

# Install and setup mise CLI
COPY --from=mise /usr/local/bin/mise /usr/local/bin/mise
RUN echo 'eval "$(mise activate zsh --shims)"' >> ~/.zprofile
RUN echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

ENTRYPOINT [ "/bin/zsh" ]
