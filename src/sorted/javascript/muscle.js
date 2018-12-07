/*
 * M3TIOR 2017
 *
 */

import package from 'webpack-conf';

import { open } from 'io';
import { injectCSS } from 'inject';
import { superglobal, SaveVariable } from 'advlodat';


const skins = JSON.parse(open("skins.json"));

SaveVariable("ossa", true);			// latin for bones
SaveVariable("derma", true);		// latin for skin
SaveVariable("musculus", true);		// latin for muscle
SaveVariable("skin_selection", 0);
SaveVariable("custom_skin", {
	text: "#000",
	colors:{
		"#FFF", "#DDD", "#BBB", "#999", "#777"
	}
});

addEventListener('lssave',(event)=>{
	let globalstyle = document.all[0].style;
	let index = event.detail.value;
	let numbered = [
		"--color-primary",
		"--color-primary-dark",
		"--color-primary-darker",
		"--color-primary-light",
		"--color-primary-lighter"
	];
	if(index < 0){
		// Custom Skin
		document.body.dataset.skin="Custom";
		for ( let i=0; i < numbered.length; i++ ) {
			globalstyle.setProperty(numbered[i], custom_skin.colors[i]);
		}
		globalstyle.setProperty("--color-highlight", custom_skin.text);
		return;
	}else{
		document.body.dataset.skin=skins[index].name; //leverage for injected CSS
		for ( let i=0; i < numbered.length; i++ ) {
			globalstyle.setProperty(numbered[i], skins[index].colors[i]);
		}
		globalstyle.setProperty("--color-highlight", skins[index].text);
		return;
	}
});

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
				 * And, I think that a self executing
				 * function that returns a bunch of objects is
				 * easier to understand than the standard DOM.
				 *
				 * Probably just personal bias.
				 */
				html = ""; // establish our output medium

				// loop through all the skins
				for (var l=0; l < skins.length; l++){
					/*
					 * And for each skin that exists add a button for it.
					 */
					html += "".concat(
						`<button `,
							`title="`, skins[l].name, `" `,
							`style="`,
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
