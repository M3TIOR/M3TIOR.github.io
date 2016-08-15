
.PHONY: build install

build:
	@echo "Building..."
	@mkdir -p BUILD
	@rsync -vr src/* BUILD
	@rsync -vr res/* BUILD
	@echo "Done!"

clean:
	@echo "Cleaning..."
	@rm -rf BUILD
	@echo "Done!"
