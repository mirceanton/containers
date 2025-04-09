# Containers

Welcome to my container images repository! If you are looking for a container, start by [browsing the GitHub Packages page for this repository's packages](https://github.com/orgs/mirceanton/packages?repo_name=containers).

## Mission Statement

My goal is to provide semantically versioned, rootless, and multi-architecture containers for various tools/applications.

I (try to) adhere to the KISS principle, logging to stdout, maintaining one process per container, avoiding tools like s6-overlay, and building all images on top of Alpine or (prefferably) Ubuntu.

## Deprecations

Containers here can be **deprecated** at any point, this could be for any reason described below.

1. The upstream application is **no longer actively developed**
2. The upstream application has an **official upstream container** that follows closely to the mission statement described here
3. The upstream application has been **replaced with a better alternative**
4. The **maintenance burden** of keeping the container here **is too bothersome**

**Note**: Deprecated containers will remained published to this repo for 6 months after which they will be pruned.

## Maintaining a Fork

I wouldn't really bother, to be honest. Just fork the [original repository](https://github.com/home-operations/containers) which is more actively maintained by a larger community.

## Credits

A lot of inspiration and ideas (like... almost all of it) are thanks to the hard work of the home-ops community, [home-operations](https://github.com/home-operations), [hotio.dev](https://hotio.dev/) and [linuxserver.io](https://www.linuxserver.io/) contributors.
