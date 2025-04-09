ARG VERSION
FROM rhysd/actionlint:${VERSION} as actionlint

FROM golang:1.24.2-bookworm
ARG TARGETARCH
COPY --from=actionlint /usr/local/bin/actionlint /usr/local/bin/actionlint
USER nobody
ENTRYPOINT ["/bin/bash"]
