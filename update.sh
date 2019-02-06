#!/bin/bash
# -------------------------------
# Updates the SVN repo with latest from GitHub
# NOTE: Assumes that the SVN repo is in the same directory...
# -------------------------------

for dir in ./*/
do
    path=${dir%*/}
    folder=${path##*/}

    if [ $folder == ".git" ] || [ $folder == ".vscode" ] || [ $folder == "config" ] || [ $folder == "node_modules" ] || [ $folder == "src" ] || [ $folder == "vendor" ]; then
        continue
    fi

    echo "Copying $folder"

    rsync -av --progress --delete $folder/* ../$folder/trunk --exclude src
done

echo "Done!"

exit 0
