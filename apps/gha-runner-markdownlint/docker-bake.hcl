target "docker-metadata-action" {}

variable "VERSION" {
  // renovate: datasource=github-tags depName=igorshubovych/markdownlint-cli
  default = "v0.44.0"
}

variable "SOURCE" {
  default = "https://github.com/igorshubovych/markdownlint-cli"
}

group "default" {
  targets = ["image-local"]
}

target "image" {
  inherits = ["docker-metadata-action"]
  args = {
    VERSION = "${VERSION}"
  }
  labels = {
    "org.opencontainers.image.source" = "${SOURCE}"
  }
}

target "image-local" {
  inherits = ["image"]
  output = ["type=docker"]
}

target "image-all" {
  inherits = ["image"]
  platforms = [
    "linux/amd64",
    "linux/arm64"
  ]
}
