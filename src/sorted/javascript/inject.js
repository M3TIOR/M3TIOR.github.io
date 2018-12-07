/*
 * M3TIOR 2017
 *
 */

function makeid() {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	do{
		text = ""; // clear out last generation
		// if you have more than 16 injections, you're doing something wrong...
		for (let i = 0; i < 8; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
	} while (document.getElementById("INJECTED.".concat(text)) != null);

	return "INJECTED.".concat(text);
}


function injectCSS(css_string){
	style = document.createElement("style");
	id = makeid();

	style.id=id;
	style.type="text/css";
	style.rel="stylesheet";
	style.innerHTML=css_string;
	document.head.appendChild(style);
	return id;
}

function injectJS(js_string){
	script = document.createElement("script");
	id = makeid();

	style.id=id;
	style.type="text/javascript";
	style.innerHTML=js_string;
	document.head.appendChild(script);
	return id;
}


export {
	injectCSS, injectJS
}
