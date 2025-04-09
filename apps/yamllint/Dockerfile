FROM python:3.13-alpine
ARG VERSION
ARG TARGETARCH
RUN pip3 install yamllint==${VERSION} 
USER guest
ENTRYPOINT ["/bin/sh"]
