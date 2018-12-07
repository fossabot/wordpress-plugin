#!/bin/bash
# -------------------------------
# Updates the SVN repo with latest from GitHub
# NOTE: Assumes that the SVN repo is in the same directory...
# -------------------------------

for dir in ./*/
do
    path=${dir%*/}
    folder=${path##*/}

    if [ $folder == ".git" ] || [ $folder == ".vscode" ] || [ $folder == "src" ] || [ $folder == "node_modules" ]; then
        continue
    fi

    echo "Copying $folder"

    rsync -av --progress $folder/* ../$folder/trunk --exclude src
done

echo "Done!"

exit 0
