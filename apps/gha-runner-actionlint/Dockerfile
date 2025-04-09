ARG VERSION
FROM rhysd/actionlint:${VERSION} as actionlint

FROM ubuntu:24.04
ARG TARGETARCH
COPY --from=actionlint /usr/local/bin/actionlint /usr/local/bin/actionlint
USER nobody
ENTRYPOINT ["/bin/bash"]
