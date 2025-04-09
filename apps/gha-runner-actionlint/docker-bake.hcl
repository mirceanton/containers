target "docker-metadata-action" {}

variable "VERSION" {
  // renovate: datasource=docker depName=rhysd/actionlint
  default = "1.7.6"
}

variable "SOURCE" {
  default = "https://github.com/rhysd/actionlint"
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
