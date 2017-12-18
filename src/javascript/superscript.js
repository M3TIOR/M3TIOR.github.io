/*
 * M3TIOR 2017
 *
 */

function include(file, callback){
	var last = document.getElementsByTagName('script')[0],
		new = document.createElement('script');
	new.onload = callback();
	new.onerror = callback();
	new.src = file;
	script.parentNode.insertBefore(new, last);
}

function require(file, callback) {
	var last = document.getElementsByTagName('script')[0],
		new = document.createElement('script');
	new.onload = callback();
	new.onerror = callback();
	new.src = file;
	script.parentNode.insertBefore(new, last);
}

async function import(file){
	return new Promise(function(resolve, reject){
		var last = document.getElementsByTagName('script')[0],
			new = document.createElement('script');
		new.onload = resolve(true);
		new.onerror = reject(false);
		new.src = file;
		script.parentNode.insertBefore(new, last);
	});
}

async function expect(file){
	return new Promise(function(resolve, reject){
		var last = document.getElementsByTagName('script')[0],
			new = document.createElement('script');
		new.onload = resolve(true);
		new.onerror = reject(false);
		new.src = file;
		script.parentNode.insertBefore(new, last);
	});
}
