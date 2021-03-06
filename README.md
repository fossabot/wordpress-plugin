# Selz WordPress Plugin
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSelz%2Fwordpress-plugin.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FSelz%2Fwordpress-plugin?ref=badge_shield)


Embed your Selz items directly into your WordPress site.

## Local development

The easiest way to develop on WordPress locally is to use "Local" by Flywheel which uses Docker behind the scenes and provides a super easy UI to get setup. To get started:

-   Install [Local](https://localwp.com)
-   Create a new WordPress site in Local
-   Clone this repo to your local machine
-   [Map each of the plugins to the VM](https://localwp.com/help-docs/how-to-use-volumes-with-local/)

Now you can edit the plugin in the GitHub repo and preview changes live.

### Building all plugin JavaScript / CSS

-   First install node
-   Run `yarn` or `npm install` in the root folder to install the packages
-   Run `yarn start:selz` or `yarn start:izettle` to compile/run in dev mode and watch for changes
-   Run `yarn build:selz` or `yarn build:izettle` to build production-ready code
-   Run `yarn build` to build production-ready code _for both plugins_

### PHP linting

-   [Install Composer](https://getcomposer.org/)
-   Run `composer install` to install the packages

### Plugin assets

| Size     | Description | Filename        | Types      |
| -------- | ----------- | --------------- | ---------- |
| 772x250  | Banner      | banner-772x250  | PNG or JPG |
| 1544x500 | Banner      | banner-1544x500 | PNG or JPG |
| 128x128  | Icon        | icon-128x128    | PNG or JPG |
| 256x256  | Icon        | icon-256x256    | PNG or JPG |
| 256x256  | Icon        | icon            | SVG        |

-   https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/

### Building the plugin zips

1.  `yarn build` to build JavaScript / CSS files
2.  `build.sh` (MacOS/Unix Bash) or `build.ps1` (Windows Powershell) to build the plugin zip file for manual installation

## Deploying to WordPress plugins SVN

To actually publish/deploy the WordPress plugin, it must be committed via SVN. You can do this by running `update.sh` if you've checked out the SVN repo to the same directory as the Git repo. It will copy all but the `/src` directory as the source files aren't needed for the plugin to function so just add extra download size for users.

Some things to remember:

-   The version in index.php must be updated (using the SemVer system - e.g. `1.0.0`)
-   The stable version must be updated in the top of the readme.txt to match the above
-   A changelog entry is required (for us and the users)
-   After you commit, you need to tag the release with the new version also


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FSelz%2Fwordpress-plugin.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FSelz%2Fwordpress-plugin?ref=badge_large)