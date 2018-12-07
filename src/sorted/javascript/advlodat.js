/*
 * M3TIOR 2018
 *
 * advlodat.js: Advanced Local Data / Local Storage
 */

// the superglobal object is and will always be the global scope binding,
// no matter where it's bound to, both in nodejs and browser js.
// This is accomplished with a self executing function that abuses the
// default global scope of a function when declared by the Function constructor.
let superglobal = (new Function("return this;"))();


/*
 * function SaveVariable:
 *		The goal of this function is to simplify the process of reading and
 *		setting localStorage variables.
 */
function SaveVariable(name, initializer, scope){
	/*
	 * Test for required variables and type constraints,
	 * throwing errors when necessary.
	 */
	if (typeof name != 'string')
		throw Error('"name" argument must be a string, not "'+typeof name+'"');

	if (scope == null) scope = superglobal; // No target scope? Use global!
	else if (typeof scope != "object")
		throw Error('"scope" argument must be an object, not "'+typeof scope+'"');

	/*
	 *	Then we need to use the Object.defineProperty function
	 *	to attatch a psuedo variable to our specified scope
	 */
	Object.defineProperty(scope, name, {
		// said variable will contain the standard getter and setter pair
		set:(value)=>{
			// from within the setter, we define a custom save event
			// to allow extra external handling for our save event.
			let LDSaveEvent = new CustomEvent("lssave",{
				// the variable name is dispatched through the event's detail
				// and some other data goes there as well.
				detail: {
					name: name,					// the variable name
					//previous: scope[name].valueOf(),	// the previous value
					// can't call scope[name] in here because it would
					// trigger the load event.
					value: value,				// the new value
					/* XXX: Non Standard
					 *	Function.caller is not standard and if used, should
					 *	always be tested for by applications using it.
					 */
					caller: Object.getOwnPropertyDescriptor(scope, name)
						.set.caller || null; // the function who saved our value
				}
			});
			// converting the saved object to a JSON string before
			// being set in localdata enables us to store native Javascript
			// values and broadens the use of our localdata
			localStorage.setItem(name, JSON.stringify(value));
			// then we dispatch the save event to our binding scope so external
			// processes can catch our saves
			scope.dispatchEvent(LDSaveEvent);
		},
		get:()=>{
			// first we actually have to load in the value from memory
			// just in case someone changed it behind our back.
			let value = JSON.parse(localStorage.getItem(name));
			// otherwise the load event could be fooled by an application
			// changing the value manually through localStorage.setItem
			// which would result in the ability to spoof the load events!

			// now, after retreiving the value, we'll define a custom
			// load event, so that external applications can process
			// when the variable is accessed.
			let LDLoadEvent = new CustomEvent("lsload",{
				detail: {
					name: name,			// the variable name
					value: value,		// the current value
					/* XXX: Non Standard
					 *	Function.caller is not standard and if used, should
					 *	always be tested for by applications using it.
					 */
					caller: Object.getOwnPropertyDescriptor(scope, name)
						.get.caller || null;// the function who loaded our value
				}
			});
			// since, we aren't modifying the value of our variable, the
			// placement of our event's dispatcher is arbitrary.
			scope.dispatchEvent(LDLoadEvent);
			// but it has to come before the return...
			return value;
		}
	});
	// finally, we set our initial value for the variable if we have one.
	if (initializer != null) && (localStorage.getItem(name) == null)
		// only when our saved value is unset, otherwise it defeats the purpose
		scope[name] = initializer;
}


export {
	superglobal, SaveVariable
};
