/*
 * M3TIOR 2017
 * ===========
 *
 *
 */

async function open(...files){
	/* DENOTE:
	 *	This function opens a file from the website just as C or Python
	 *	would open a file from the current directory.
	 *
	 *	I've done a lot of simplification here without a lot of forward thinking
	 *	so the api for this isn't as robust as something like Python's open
	 *	function yet. For instance, you won't be able to check the reason for
	 *	load failure until I implement a callback or errors messages for them.
	 */
	async function retrieve(filename) {
		return new Promise(function(resolve, reject){ 			/* async and wait */
			var xhr = new XMLHttpRequest();						/* fetch */
			xhr.overrideMimeType("application/json");
			xhr.open('GET', filename, true);
			xhr.onload = function() { resolve(xhr.responseText); };
			xhr.onerror = function() { reject(null); };
			xhr.send(null);
		});
	}

	RESOLVED = {};	// Our files after they've been retrieved.
	LOADING = [];	// Our promises while they're being resolved.

	for (var l=0; l < arguments.length; l++){
		/*
		 * This little snippit completely checks the type of a variable
		 * so we can add better error handling or at the very least more
		 * verbose error messages.
		 */
		type = (
			typeof arguments[l] == "object" ?
				arguments[l].constructor.name : typeof arguments[l]
		);
		if ( type !== "string" ){
			/* NOTE:
			 *	Need better error handeling later
			 */
			throw Error("Arguments should be strings");
		}
	}

	for (var l=0; l < arguments.length; l++){
		LOADING.push(retrieve(arguments[l]));
	}
	/* And, now we wait for everything to load */
	for (var l=0; l < LOADING.length; l++) {
		RESOLVED[arguments[l]] = await LOADING[l];
	}
	return RESOLVED; // then resync
}
