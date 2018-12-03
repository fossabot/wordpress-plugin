# Selz WordPress Plugin

Embed your Selz items directly into your WordPress site.

## Local development

The easiest way to develop on WordPress locally is to use "Local by Flywheel" which uses Docker behind the scenes and provides a super easy UI to get setup. To get started:

-   Install [Local by Flywheel](https://local.getflywheel.com)
-   Create a new WordPress site in Local
-   Install the [Volumes Add-on](https://github.com/getflywheel/local-addon-volumes#downloading-a-release)
-   Clone this repo to your local machine
-   In the settings for the VM in Local, go to "More" then click "Volumes"
-   Map the the map to each of the plugins to the VM. For example `~/Development/wordpress-plugins/selz-ecommerce` to `/app/public/wp-content/plugins/selz-ecommerce`. The first part will be specific to where you cloned the `wordpress-plugin` repo to.

Now you can edit the plugin in the GitHub repo and preview changes live.

### Building all plugin JavaScript / CSS

If you make changes to the LESS or JavaScript you'll need to run gulp

-   First install node
-   Run `npm install` or `yarn` in the `selz-ecommerce` folder to install the packages
-   Run `gulp` which will run the default tasks and watch for changes

### Building the plugin zips

To build the plugin zip file for manual installation run `build.sh` (MacOS/Unix Bash) or `build.ps1` (Windows Powershell)

## Deploying to WordPress plugins SVN

To actually publish/deploy the WordPress plugin, it must be committed via SVN. Some things to remember:

-   The version in index.php must be updated (using the SemVer system - e.g. `1.0.0`)
-   The stable version must be updated in the top of the readme.txt to match the above
-   A changelog entry is required (for us and the users)
-   After you commit, you need to tag the release with the new version also
