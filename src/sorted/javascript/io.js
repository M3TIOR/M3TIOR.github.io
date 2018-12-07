/*
 * M3TIOR 2017
 *
 *	EMCA Script 6 compliant; Please be aware other browsers may not like this.
 */

'use strict'

function open(file) {
	let xhr = new XMLHttpRequest();
	xhr.overrideMimeType("text/plain; charset=x-user-defined");
	xhr.open('GET', filename, false);
	xhr.send(null);
	return xhr.responseText || null;
}

async function async_open(file) { /* must be async to transfer promise*/
	return new Promise((resolve, reject)=>{ 			/* async and wait */
		let xhr = new XMLHttpRequest();						/* fetch */
		xhr.overrideMimeType("text/plain; charset=x-user-defined");
		xhr.open('GET', filename, true);
		xhr.onload = () => { resolve(xhr.responseText); };
		xhr.onerror = () => { reject(null); };
		xhr.send(null);
	});
}

function open_many(...files) {
	/* DENOTE: */

	let FILES = {};		// Our return object.


	for (let l=0; l < arguments.length; l++){
		/*
		 * This little snippit completely checks the type of a variable
		 * so we can add better error handling or at the very least more
		 * verbose error messages.
		 */
		let type = (typeof arguments[l] == "object" ?
				arguments[l].constructor.name : typeof arguments[l]);
		if ( type !== "string" ){
			/* NOTE:
			 *	Need better error handeling later
			 */
			throw Error('Arguments should be strings, not "'+ type +'" @argument No.'+l);
		}
	}

	for (let l=0; l < arguments.length; l++){
		FILES[arguments[l]] = open(arguments[l]);
	}
	return FILES;
}

function async_open_many(...files) {
	/* DENOTE:
	 *	This function opens a file from the website just as C or Python
	 *	would open a file from the current directory.
	 *
	 *	I've done a lot of simplification here without a lot of forward thinking
	 *	so the api for this isn't as robust as something like Python's open
	 *	function yet. For instance, you won't be able to check the reason for
	 *	load failure until I implement a callback or errors messages for them.
	 */

	let PENDING = {};	// Our promises while they're being resolved.

	for (let l=0; l < arguments.length; l++){
		/*
		 * This little snippit completely checks the type of a variable
		 * so we can add better error handling or at the very least more
		 * verbose error messages.
		 */
		let type = (typeof arguments[l] == "object" ?
				arguments[l].constructor.name : typeof arguments[l]);
		if ( type !== "string" ){
			/* NOTE:
			 *	Need better error handeling later
			 */
			throw Error('Arguments should be strings, not "'+ type +'" @argument No.'+l);
		}
	}

	for (let l=0; l < arguments.length; l++){
		PENDING[arguments[l]] = async_open(arguments[l]);
	}
	return PENDING;
}

export {
	open, async_open,
	open_many, async_open_many
};
