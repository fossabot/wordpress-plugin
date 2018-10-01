# -------------------------------
# Build the themes
# -------------------------------

Add-Type -assembly "system.io.compression.filesystem"

# exclusion rules. Can use wild cards (*)
$exclude = @("node_modules",".git",".DS_Store","src")

Get-ChildItem -path ".\" -exclude $exclude |
?{ $_.PSIsContainer } |
foreach {
    # Construct file name
    $file = $_.FullName + ".zip";

    "Building " + $_.Name + ".zip..."

    # Remove old files
    If (Test-path $file) {
        Remove-item $file
    }

    # Build new zip
    [System.IO.Compression.ZipFile]::CreateFromDirectory($_.FullName, $file)
}
