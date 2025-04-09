FROM python:3.13-alpine@sha256:18159b2be11db91f84b8f8f655cd860f805dbd9e49a583ddaac8ab39bf4fe1a7
ARG VERSION
ARG TARGETARCH
RUN pip3 install yamllint==${VERSION} 
USER guest
ENTRYPOINT ["/bin/sh"]
