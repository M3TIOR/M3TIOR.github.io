
.PHONY: build deploy clean

build:
	@echo "Building..."
	@mkdir -p BUILD
	@rsync -vr src/* BUILD
	@rsync -vr res/* BUILD
	@echo "Done!"

#deploy: clean build
#	@echo "Uploading to github..."
#	@git subtree split --prefix BUILD -b master
#	@git push -f origin master:master
#	@echo "Done!"

# Shouldn't need to use this any more
# since I have a gitignore to keep that directory
# from being pushed into the development branch.
# But just in case, I'm leaving it here.
clean:
	@echo "Cleaning..."
	@rm -rf BUILD/*
	@echo "Done!"
