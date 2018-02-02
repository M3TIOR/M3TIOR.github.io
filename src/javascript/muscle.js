/*
 * M3TIOR 2017
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

function injectCSS(string){
	function makeid(length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	style = document.createElement("style");
	id = "".concat("INJECTED.",makeid(12));

	style.id=id;
	style.type="text/css";
	style.rel="stylesheet";
	style.innerHTML=string;
	document.head.appendChild(style);
	return id;
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
	SKINS = await JSON.parse(FILES["skins.json"]);

	MUSCLE = {
		bone: new savedValue("bone", true),
		derma: new savedValue("derma", true),
		muscle: new savedValue("muscle", true),
		skins: new savedValue("skins", 0),
		custom: new savedValue("custom_schema", {
			colorPrimary: "#FFFFFF",
			colorPrimaryDark: "#FFFFFF",
			colorPrimaryLight: "#FFFFFF",
			colorPrimaryLighter: "#FFFFFF",
			colorPrimaryDarker: "#FFFFFF",
			colorContrast: "#000000"
		}),

		init: async function(){
			/*
			 *	First thing, We're gonna do is populate the id=muscles
			 *	panel with controlers for the website.
			 */
			document.getElementById("muscles").innerHTML = `
				<div id="skins"><!-- Color Schema -->
					<div><!--skins.json-->
						`+(function(){
							/*
							 * I know this looks horrible. But trust me,
							 * It'd look alot worse if you were forced to look
							 * at 100+ lines of redundant DOM API calls...
							 *
							 * And, I think personally that a self executing
							 * function that returns a bunch of objects is
							 * easier to understand than the standard DOM.
							 *
							 * Probably just personal bias.
							 */
							html = ""; // establish our output medium

							// loop through all the skins
							for (var l=0; l < SKINS.length; l++){
								/*
								 * And for each skin that exists add a button for it.
								 */
								html += "".concat(
									`<button `,
										`title=\"`, SKINS[l].name, `\" `,
										`style=\"`,
											`height:30px;`,
											`width:30px;`,
											`font-size:0px;`,
											`background-color:`, SKINS[l].colorPrimary,`;`,
											`border: 2px solid `, SKINS[l].colorPrimaryDark,`;`,
										`\" `,
										`onclick=\"MUSCLE.skins.value=`,l,`\" `,
									`>`,
										SKINS[l].name,
									`</button>`
								);
							}
							return html;
						})()+`
					</div>
					<div>
						<form id="Custom_Skin">
							<div id="Color-Chooser">
								
							<div>
							<input placeholder="First Color" type="text"/>
							<input placeholder="Second Color" type="text"/>
							<input placeholder="Third Color" type="text"/>
							<input placeholder="Fourth Color" type="text"/>
							<input placeholder="Fifth Color" type="text"/>
							<input placeholder="Contrast Color" type="text"/>
						</form>
					</div>
				</div>
				<div id="biology">
				</div>
			`;

			/*
			 * After adding the buttons into the document, We need to change
			 * the document style when the buttons are clicked.
			 */
			this.skins.onchange(function(index){
				//   html.style.setProperty(...)
				if(index < 0){
					// Custom Skin
					document.body.dataset.skin="Custom";
					document.all[0].style.setProperty('--color-primary', custom.value.colorPrimary);
					document.all[0].style.setProperty('--color-primary-dark', custom.value.colorPrimaryDark);
					document.all[0].style.setProperty('--color-primary-darker', custom.value.colorPrimaryDarker);
					document.all[0].style.setProperty('--color-primary-light', custom.value.colorPrimaryLight);
					document.all[0].style.setProperty('--color-primary-lighter', custom.value.colorPrimaryLighter);
					document.all[0].style.setProperty('--color-highlight', custom.value.colorContrast);
					return;
				}else{
					document.body.dataset.skin=SKINS[index].name; //leverage for injected CSS
					document.all[0].style.setProperty('--color-primary', SKINS[index].colorPrimary);
					document.all[0].style.setProperty('--color-primary-dark', SKINS[index].colorPrimaryDark);
					document.all[0].style.setProperty('--color-primary-darker', SKINS[index].colorPrimaryDarker);
					document.all[0].style.setProperty('--color-primary-light', SKINS[index].colorPrimaryLight);
					document.all[0].style.setProperty('--color-primary-lighter', SKINS[index].colorPrimaryLighter);
					document.all[0].style.setProperty('--color-highlight', SKINS[index].colorContrast);
				}
			});

			injectCSS(`
				/* Ashen's Soul */
				[data-skin=\"Ashen\"] #social{
					/* Put SVG Transmutation Circle Here */
					/* background-image: url(); */
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
				}
				[data-skin=\"Ashen\"] #navigation *{
					--animation-color-originem: var(--color-primary-dark);
					--animation-color-mono: #311010;
					--animation-color-bi: #101031;
					animation: GLOWborder-color102 10s infinite ease;
				}
				[data-skin=\"Ashen\"] .topic{
					--animation-color-originem: var(--color-primary-dark);
					--animation-color-mono: #311010;
					--animation-color-bi: #101031;
					animation: GLOWborder-color102 10s infinite ease;
					border: 2px solid;
				}
				[data-skin=\"Ashen\"] .subject{
					--animation-color-originem: var(--color-primary-dark);
					--animation-color-mono: #311010;
					--animation-color-bi: #101031;
					animation: GLOWborder-color102 10s infinite ease;
					border: 2px solid;
				}
				@media only screen and (min-width : 481px){
					.subject{
						flex-basis: calc(calc(var(--subject-size) * 1%) - 4px);
					}
				}

			`);


			/*----------------------------------------------------------------*/
			/*
			 * re-executes our onchange functions onload instead of making
			 * the values of the page load as what they were when the user set them.
			 * (Less programming I have to do...)
			 */
			this.bone.value = this.bone.value;
			this.derma.value = this.derma.value;
			this.muscle.value = this.muscle.value;
			this.skins.value = this.skins.value;
		},

		end:0 // end of STRUCT because js is evil
	};

	MUSCLE.init();
})();
