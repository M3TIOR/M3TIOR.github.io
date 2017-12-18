/*
 * M3TIOR 2017
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
