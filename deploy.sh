#!/bin/bash



while :; do
	if [ "$PWD" = "/" ]; then
		echo "no .deploy file"
		exit 1
	fi
	if [ -e ".deploy" ]; then
		break
	fi
	cd ..
done



destination=$(awk -F ":" '/destination/{ print $2 }' "$path.deploy")
fsource=$(awk -F ":" '/source/{ print $2 }' "$path.deploy")


aws s3 sync "$fsource" "s3://$destination"
aws s3 ls "s3://$destination"

#for file in $fsource; do
#	echo "rsync -rzhv --links --dry-run $file $destination"
#	rsync -rzhv --links $file $destination
#	#rsync -rzhv --links --dry-run $file $destination
#done

