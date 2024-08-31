#!/bin/bash

if [[ "$TARGETARCH" == "amd64" ]]; then
  export ARCH="x64"
elif [[ "$TARGETARCH" == "arm64" ]]; then
  export GOARCH="arm64"
else
  echo "Unsupported architecture: $TARGETARCH"
  exit 1
fi

echo "Building Bitwarden CLI v${VERSION}"
echo "Building for arch: $ARCH"
echo "Building for os: $TARGETOS"

echo "Installing pkg"
npm install -g pkg

echo "Cloning bw repo"
git clone https://github.com/bitwarden/clients
cd clients
git checkout cli-v${VERSION}

echo "Installing dependencies"
npm install
cd apps/cli
npm install

echo "Building..."
npm run build:oss

echo "Packaging..."
pkg . --targets node18-${TARGETOS}-${ARCH} --output=./dist/bw
