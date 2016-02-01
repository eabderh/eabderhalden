#!/bin/bash


destination=$(awk -F ":" '/destination/{ print $2 }' .deploy)
fsource=$(awk -F ":" '/source/{ print $2 }' .deploy)
echo $destination

for file in $fsource; do
	echo "rsync -rzhv --links --dry-run $file $destination"
	rsync -rzhv --links $file $destination
	#rsync -rzhv --links --dry-run $file $destination
done

