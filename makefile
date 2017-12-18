
.PHONY: build deploy fix-deploy clean

build:
	@echo "Building..."
	@mkdir -p BUILD
	@rsync -vr src/css/* BUILD
	@rsync -vr src/html/* BUILD
	@rsync -vr src/javascript/* BUILD
	@rsync -vr src/json/* BUILD
	@rsync -vr res/* BUILD
	@echo "Done!"

deploy: clean build
	@echo "Uploading to github...";
	@git push --delete origin master;
	@git subtree push --prefix=BUILD origin master;
	@echo "Done!"

#fix-deploy:
#	@echo "Refreshing Github..."
##	@\
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
	@rm -rf BUILD/*
	@echo "Done!"
