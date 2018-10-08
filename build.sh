#!/bin/bash
# -------------------------------
# Build the themes
# -------------------------------

cd "$( dirname "${BASH_SOURCE[0]}" )"

for dir in ./*/
do
    path=${dir%*/}
    folder=${path##*/}

    if [ $folder == ".git" ] || [ $folder == ".vscode" ] || [ $folder == "src" ] || [ $folder == "node_modules" ]; then
        continue
    fi

    file=$folder.zip

    echo "Building $file"

    # Delete old files to be sure
    if [ -f $file ]; then
        rm $file
    fi

    # Switch to directory so it's not in the zip file paths
    cd ${path##*/}

    # Build the zip
    zip -qr ../$file * -x "*.DS_Store*"

    cd ..
done

echo "Done!"

exit 0
