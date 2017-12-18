/*
 * M3TIOR 2017
 *
 */

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
	await include("savedValue.js");
	await include("open.js");
	await include("specialskin.js");

	FILES = await open("skins.json");
	SKINS = await JSON.parse(FILES["skins.json"]),

	MUSCLE = {
		bone: new savedValue("bone", true),
		derma: new savedValue("derma", true),
		muscle: new savedValue("muscle", true),
		skin: new savedValue("skin", 0),
		custom: new savedValue("custom_schema", {
			colorPrimary: "#FFFFFF",
			colorPrimaryDark: "#FFFFFF",
			colorPrimaryLight: "#FFFFFF",
			colorPrimaryLighter: "#FFFFFF",
			colorPrimaryDarker: "#FFFFFF"
		}),

		init: async function(){
			dashboard = document.getElementById("muscles");
			dashboard.innerHTML = `
				<div id="skins"><!-- Color Schema -->
					<div><!--skins.json-->
						`+(function(){
							html = "";
							for (var l=0; l < SKINS.length; l++){
								html +=
								`<button `+
									`title=\"`+SKINS[l].description+`\" `+
									`style=\"`+
										`height:30px;`+
										`width:30px;`+
										`font-size:0px;`+
										`background-color:`+SKINS[l].colorPrimary+`;`+
										`border: 2px solid `+SKINS[l].colorPrimaryDark+`;`+
									`\" `+
									`onclick=\"MUSCLE.schema.value=`+l+`\" `+
								`>`+
									SKINS[l].name+
								`</button>`;
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
			this.skin.onchange(function(index){
				//   html.style.setProperty(...)
				if(index < 0){
					// Custom Skin
					document.all[0].style.setProperty('--color-primary', SKINS[index].colorPrimary);
					document.all[0].style.setProperty('--color-primary-dark', SKINS[index].colorPrimaryDark);
					document.all[0].style.setProperty('--color-primary-darker', SKINS[index].colorPrimaryDarker);
					document.all[0].style.setProperty('--color-primary-light', SKINS[index].colorPrimaryLight);
					document.all[0].style.setProperty('--color-primary-lighter', SKINS[index].colorPrimaryLighter);
					document.all[0].style.setProperty('--color-highlight', SKINS[index].colorContrast);
					return;
				}else{
					document.all[0].style.setProperty('--color-primary', SKINS[index].colorPrimary);
					document.all[0].style.setProperty('--color-primary-dark', SKINS[index].colorPrimaryDark);
					document.all[0].style.setProperty('--color-primary-darker', SKINS[index].colorPrimaryDarker);
					document.all[0].style.setProperty('--color-primary-light', SKINS[index].colorPrimaryLight);
					document.all[0].style.setProperty('--color-primary-lighter', SKINS[index].colorPrimaryLighter);
					document.all[0].style.setProperty('--color-highlight', SKINS[index].colorContrast);
				}
				if(SKINS[index].name == "Ashen"){
				 	glowElements= document.querySelectorAll("[data-glow]");

					document.all[0].style.animation="darkbluered 1.5s infinite alternate";
				}else{
					document.all[0].style.animation="none";
				}
			});

			/*
			 * re-executes our onchange functions onload instead of making
			 * the values of the page load as what they were when the user set them.
			 * (Less programming I have to do...)
			 */
			this.bone.value = this.bone.value;
			this.skin.value = this.skin.value;
			this.muscle.value = this.muscle.value;
			this.schema.value = this.schema.value;
		},

		end:0 // end of STRUCTbecause js is evil
	};
})();
