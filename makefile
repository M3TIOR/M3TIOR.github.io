#!/usr/bin/make

#
# m3tior 2018
#

.PHONY: build deploy fix-deploy clean php

php:
	@# NOTE:
	@#	For the record, make and php are the two most touchy systems
	@#	I have ever fucked with in my life, but god damn do I love them!
	@#	It's like figuring out a giant puzzle every time I make a new project!
	@#
	@# 	Which is why I'm going to let you know not to touch this...
	@#	If you value your life and your time YOU WILL NOT TOUCH THIS!
	@#
	@#	PHP's json_decode doesn't like trailing commas on array elements
	@#	so please don't screw up the transfer from make to php...
	@#	It won't end well...
	PHP_FLAGS='$(foreach flag,$(FLAGS),"$(flag)",)'; \
	for file in $(wildcard src/php/*); do \
		NODIR=$${file##*/}; \
		FNAME=$${NODIR%.php}; \
		if [ "$${NODIR#*.}" != "php" ]; then \
			$(strip \
				php -f $$file -- "{\
					\"FLAGS\": [\
						$${PHP_FLAGS%*,}\
					]\
				}" > build/$$FNAME; \
			) \
		fi; \
	done;


build: php
	@echo "Building..."
	@mkdir -p build
	@ \
		while read line; do \
			{ set -x; cp -u $line }; \
		done < <(php -f ../tools/conglomerator.php);
	@rsync -vr res/* build
	@rsync -vr json/* build
	@rsync -vr html/* build
	@echo "Done!"

deploy: clean build
	@echo "Uploading to github...";
	@git push --delete origin master;
	@git subtree push --prefix=build origin master;
	@echo "Done!"

#fix-deploy:
#	@echo "Refreshing Github..."
#	@\
#		git stash;\
#		git checkout master;\
#		git pull;\
#		git commit --allow-empty -m "Trigger rebuild" master;\
#		git push;\
#		git checkout development;\
#		git stash pop;
#	@echo "Done!"

# Shouldn't need to use this any more
# since I have a gitignore to keep that directory
# from being pushed into the development branch.
# But just in case, I'm leaving it here.
clean:
	@echo "Cleaning..."
	@rm -rf build/*
	@echo "Done!"
