#!/bin/bash


destination=$(awk -F ":" '/destination/{ print $2 }' .deploy)
fsource=$(awk -F ":" '/source/{ print $2 }' .deploy)


aws s3 sync "$fsource" "s3://$destination"
aws s3 ls "s3://$destination"

#for file in $fsource; do
#	echo "rsync -rzhv --links --dry-run $file $destination"
#	rsync -rzhv --links $file $destination
#	#rsync -rzhv --links --dry-run $file $destination
#done

