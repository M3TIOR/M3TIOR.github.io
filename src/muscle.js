/*
 * M3TIOR 2017
 *
 *
 */

var savedValue = function(name, default_value){ // CONSTRUCTOR
	/*
	 * This constructor exists to provide a simpler interface for toggleing
	 * values stored in localStorage.
	 */

	/* STATIC ELEMENTS */
	this.onChangeExecutors = []; //This will hold our callbacks
	this.name = null; // just in case something breaks

	/* TESTS */
	if(!name || typeof name !== "string")
		throw Error("The argument \"name\" must be set to a string");
	else
		this.name = name;

	if(localStorage.getItem(this.name) === null)
		localStorage.setItem(this.name, JSON.stringify(default_value));

	/* Special Variables & Functions */
	Object.defineProperty(this, 'value', {
		set: function(new_value) {
			for(var l=this.onChangeExecutors.length-1; l>=0; l--){
				this.onChangeExecutors[l](new_value);
			}
			localStorage.setItem(this.name, JSON.stringify(new_value));
		},
		get: function() {
			return JSON.parse(localStorage.getItem(this.name));
		}
	});
	this.onchange = function(f){
		if(typeof f !== "function")
			throw ValueError("Argument must be a function");
		else
			this.onChangeExecutors.push(f);
	}
};

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

/* OH BOY...
 *
 *	So, because javascript is funky I have to do all of what I want within
 *	a self executing asynchronous function... Gr8...
 *
 *	Oh well, global asynchronous behavior does have it's benefits...
 */

/*
 * Although, In order for me to make them available to the linear javascript
 * I still have to predefine the variables outside the function scope...
 */
var FILES = null;
var SKINS = null;
var MUSCLE = null;
(async function(){
	/* BEGIN LOADING EXTERNAL FILES
	 *
	 * NOTE:
	 *	I'm not usually the type of person who likes racing conditions,
	 *	so I'm going to initialize all the file resources of this script within
	 *	an asynchronous environment. If done correctly; awaiting all promises
	 *	before dropping into linear execution again, I can speed up my load times.
	 *
	 *	That is, if I have enough files to adversly affect linear loading.
	 *
	 *	But I think doing this to scale the first time means there's less I have to
	 *	worry about later.
	 */

	/*
	* I'm using a parent object as a container here just so it's easier to
	* read my code later and understand what files I'm referencing where.
	*/
	FILES = await open("skins.json");
	SKINS = await JSON.parse(FILES["skins.json"]),

	MUSCLE = {
		bone: new savedValue("bone", true),
		skin: new savedValue("skin", true),
		muscle: new savedValue("muscle", true),
		schema: new savedValue("schema", 0),

		init: async function(){
			dashboard = document.getElementById("muscles");
			dashboard.innerHTML = `
				<div id="schema"><!-- Color Schema -->
					<div><!--skins.json-->
						`+(function(){
							html = "";
							for (var l=0; l < SKINS.length; l++){
								html += `
								<button title=\"`.trim()+`
									`+SKINS[l].description+`
								\"`.trim()+` style=\"`.trim()+`
										height:30px;`.trim()+`
										width:30px;`.trim()+`
										font-size:0px;`.trim()+`
										background-color:`.trim()+SKINS[l].colorPrimary+`;
										border: 2px solid `.trim()+SKINS[l].colorPrimaryDark+`;
									\"`.trim()+`
								>`+SKINS[l].name+`</button>`;
							}
							return html;
						})()+`
					</div>
					<div>
					</div>
				</div>
				<div id="biology">
				</div>
			`;
			/*----------------------------------------------------------------*/
			this.schema.onchange(function(new_value){
				
			});
		},

		end:0 // end of PAGE syntax easy because js is evil
	};
})();
