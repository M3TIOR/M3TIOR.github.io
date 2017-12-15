/*
 * M3TIOR 2017
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
		localStorage.setItem(this.name, JSON.stringify(new_value));

	/* Special Variables & Functions */
	Object.defineProperty(this, 'value', {
		set: function(new_value) {
			for(var l=this.onChangeExecutors.length-1; l>=0; l--){
				this.onChangeExecutors[l]();
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

async function open(filename) {
	return new Promise(function(resolve, reject){
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', filename, true);
		xhr.onload = function() { resolve(xhr.responseText); };
		xhr.onerror = function() { reject(xhr.statusText); };
		xobj.send(null);
	});
}

var FLAVORS=(async function(){
	raw = await open("skins.json");
	return JSON.parse(raw);
})();

var MUSCLE={
	bone: new savedValue("bone", true),
	skin: new savedValue("skin", true),
	muscle: new savedValue("muscle", true),
	schema: new savedValue("schema", 0),

	init: async function(){
		dashboard = document.getElementById("muscles");
		dashboard.innerHTML = `
			<div><!-- Color Schema -->
				`+(function(){
					html = "";
					for (var l=0, l < FLAVORS.length, l++){
						html += '<div style=\"background-color:'+FLAVORS[l].colorPrimary+';\"';
					}
					return html;
				})()+`
			</div>
			<div>
			</div>
		`;
	},

	end:0 // end of PAGE syntax easy because js is evil
};
