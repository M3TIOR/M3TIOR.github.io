
.PHONY: build deploy clean

build:
	@echo "Building..."
	@mkdir -p BUILD
	@rsync -vr src/* BUILD
	@rsync -vr res/* BUILD
	@echo "Done!"

deploy: build
	@echo "Uploading to github..."
	@git subtree split --prefix BUILD -b master
	@git push -f origin master:master
	@echo "Done!"

clean:
	@echo "Cleaning..."
	@rm -rf BUILD
	@echo "Done!"
