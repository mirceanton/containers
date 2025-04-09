ARG VERSION
FROM rhysd/actionlint:${VERSION} as actionlint

FROM debian:bookworm-slim
ARG TARGETARCH
COPY --from=actionlint /usr/local/bin/actionlint /usr/local/bin/actionlint
ENTRYPOINT ["/bin/bash"]
