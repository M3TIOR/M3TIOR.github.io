
.PHONY: build deploy fix-deploy clean

build:
	@echo "Building..."
	@mkdir -p BUILD
	@rsync -vr src/* BUILD
	@rsync -vr res/* BUILD
	@echo "Done!"

deploy: clean build
	@echo "Uploading to github..."
	@cd BUILD;\
		git add --all;\
		git commit -m "Deploying New Version";\
		git push;
	@echo "Done!"

fix-deploy:
	@echo "Refreshing Github..."
	@cd BUILD;\
		git commit --allow-empty -m "Trigger rebuild" master;\
		git push;
	@echo "Done!"

# Shouldn't need to use this any more
# since I have a gitignore to keep that directory
# from being pushed into the development branch.
# But just in case, I'm leaving it here.
clean:
	@echo "Cleaning..."
	@rm -rf BUILD/*
	@echo "Done!"
