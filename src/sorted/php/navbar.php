<?php

$navbar = new stdObject();

$navbar->html = <<<'EOD'
<input class="bone" type="checkbox" id="contactCTRL">
<input class="bone" type="checkbox" id="navbarCTRL">
<!-- Navbar insert  (Go tah hell Austin... mer... :P )-->
<div id="navigation">
	<label for="navbarCTRL">
		<span class="bone">Toggle Controls</span>
		<img></img>
	</label>
	<div id="navigation-content">
		<ul>
			<li><a href="">Home</a></li>
			<li><a href="">Feed</a></li>
			<li><label for="contactCTRL">Contact</label></li>
		</ul>
		<div id="muscles"><!-- javascript buttons go here --></div>
		<div id="copyright">
			&copy;<span>Ruby Allison Rose</span>
		</div>
	</div>
</div>
<label id="contact" for="contactCTRL"><!--Alternative exit method for css desktop -->
	<div>
		<label for="contactCTRL">
			<svg viewBox="1,0,21,21">
				<rect y="10" width="25" height="5" transform="rotate(-45) translate(-12,3)"/>
				<rect x="10" width="5" height="25" transform="rotate(135) translate(-13,-28)"/>
			</svg>
		</label>
		<address>
			<h1 style="display: none;" class="css-only">Ruby Allison Rose</h1>
			<span class="bone">Contact me at:</span>
			<a href="mailto:cplusplusook32@gmail.com">cplusplusook@gmail.com</a>
			<a href="tel:3606905625">360-690-5625</a>
		</address>
	</div>
</label>
EOD;

$navbar->css <<<'EOD'
/*
 * M3TIOR 2017
 *
 * 	Website Navbar
 */

/* NOTE:
 *	For responsive design...
 *
 *	          Smartwatches > 319px
 *	320px  <= Smartphones  > 479px
 *	480px  <= Tablets      > 800px
 *	801px  <= Laptops      > 1280px
 *	1281px <= Desktops
 */

html{
	/*
	 * Global Variable / Value Descriptor Location
	 */

	/* --navbar-* */
	--navbar-font-size: 24;
	--navbar-size: calc(var(--navbar-font-size) * 2); /* (N)em */
	--navbar-icon-size: calc(var(--navbar-size) * calc( 2 / 3));
	/* NOTE:
	 *	Only doing this because I'm not sure if the behavior of the
	 *	"em" type is constant among different browsers.
	 */

	min-width: 200px;
}

#navigation{
	color: var(--color-highlight);
	background-color: var(--color-primary);

	/* Sets the scale of each "em" increment*/
	font-size: calc(var(--navbar-font-size) * 1px);
	font-style: normal;
	font-family: "Courier";
	line-height: 0px;
	/*--------- It was breaking all my responsive stuff... --------------*/

	box-shadow: 0px 1px 20px #000;
	position: fixed;
	width: 100%;
	z-index: 2; /* covering my tush yet again */

	height: calc(var(--navbar-size) * 1px);
}

#navigation *{
	padding: 0px;
	margin: 0px;
	border: none;
	line-height: calc(var(--navbar-font-size) * 1px); /*finally I found my problem...*/
	color: var(--color-highlight);
	text-decoration: none;

	/* webkit breaks things lol */
	-webkit-margin-before: 0px;
	-webkit-margin-after: 0px;
	-webkit-padding-start: 0px;
}
#navigation > label{
	/* This holds our toggle controller */
	background: radial-gradient(var(--color-primary-dark), var(--color-primary));
}
#navigation > label > img{
	height: calc(var(--navbar-icon-size) * 1px);
	width: calc(var(--navbar-icon-size) * 1px);
	src: url(icons/logo.svg);
	content: url(icons/logo.svg);
	padding: calc(calc(var(--navbar-size) - var(--navbar-icon-size)) * 0.5px);
	display: block;
	margin: auto;
}
#navigation #navigation-content > ul > li{
	display: inline-block;
	pointer-events: all;
}
#navigation #navigation-content > ul > li:hover{
	text-decoration:underline;
}

#muscles{
	display: none;
	padding: 10px;
	width: calc(100% - 20px); /*for the padding*/
}
#navbarCTRL:checked ~ #muscles{
	pointer-events: all;
	display: block;
	z-index: 1;
}

/*
 * Smartphones or Devices with small screens
 *
 * NOTE:
 *	I'm only really using two cases here for now because
 *	I have so little content on the navbar that it
 *	really shouldn't become a problem unless I try
 *	and add a few more links or something...
 *	but for now this should do since I'm in a rush.
 */
@media only screen and (max-width : 380px) {
	html{
		/*
		 * Have to make room for the navbar so it doesn't cover other
		 * elements of the document body...
		 */
		margin-bottom: calc(var(--navbar-size) * 1px);
	}

	/*----- Core Toggle Function ------*/
	#navbarCTRL:checked ~ #navigation{ 		/* Resize Navbar */
		top: 0px;
		height: 100%;
	} /* ELSE */
		#navigation{
			bottom: 0px;
	}
	#navbarCTRL:checked ~ #navigation > *{	/* Toggle Content */
		display: block;
	} /* ELSE */
		#navigation > *{
			display: none;
	}
	/*---------------------------------*/

	#navbarCTRL:checked ~ #navigation #copyright > span{
		display: inline-block;
		padding: 10px;
	}

	#navbarCTRL:checked ~ #navigation > label{
		background: radial-gradient(circle, var(--color-highlight) 30%, rgba(0, 0, 0, 0) 65%);
		border-bottom: 1px solid var(--color-primary-dark);
	} /* ELSE */
		#navigation > label{
			display: block; /* override wildcard */
	}

	#navigation #navigation-content > ul > li{
		padding: 10px;
		border-bottom: 1px solid var(--color-primary-dark);
		width: calc(100% - 20px); /*for the padding*/
	}
	#navigation #navigation-content > ul > li:hover{
		background-color: var(--color-primary-light);
	}

	#navigation #navigation-content{
		height: calc(100% - calc(var(--navbar-size) * 2px));
		overflow-y: scroll;
		width: 100%;
	}

	#copyright{
		position: absolute;
		text-align: center;
		font-size: 12px;
		width: 100%;
		bottom: 0px;
		background-color: var(--color-primary-dark);
	}
}

/* Above */
@media only screen and (min-width : 381px){
	html{
		/*
		 * Have to make room for the navbar so it doesn't cover other
		 * elements of the document body...
		 */
		margin-top: calc(var(--navbar-size) * 1px);
	}
	#navigation{
		top: 0px;
	}
	#navigation > *{
		display: inline-block;
	}
	#navigation > label{
		position: absolute;
		border-right: 1px solid var(--color-primary-dark);
		width: calc(var(--navbar-size) * 1px);
	}
	#navigation > label:hover{
		background: radial-gradient(circle, var(--color-highlight) 30%, rgba(0, 0, 0, 0) 65%);
	}
	#navigation-content{
		pointer-events: none;
		position: absolute;
		width: 100%;
	}
	#navigation-content > ul{
		position: absolute;
		left: calc(var(--navbar-size) * 1px);
		padding-top: calc(calc(var(--navbar-size) - var(--navbar-font-size)) * 0.5px);
		padding-bottom: calc(calc(var(--navbar-size) - var(--navbar-font-size)) * 0.5px);
		padding-left: 20px;
	}
	#muscles{
		position: absolute;
		top: calc(var(--navbar-size) * 1px);
		background-color: var(--color-primary);
		border-top: 2px solid var(--color-primary-dark);
		box-shadow: 0px 4px 8px #000;
	}
	#copyright{
		float: right;
		padding: calc(var(--navbar-size) * 0.25px);
		pointer-events: all;
	}
	#copyright span{
		position:absolute;
		bottom:-15px;
		right:0px;
		visibility:hidden;
		font-size: 11px;
		display: inline-block;
		width: auto;
		padding: 10px;
	}
	#copyright:hover span{
		visibility: visible;
	}
}

/*============================================================================*/

/*
 * M3TIOR 2017
 *
 *		Navbar Contact
 */

*{
	/*
	 * Global Variable / Value Descriptor Location
	 */
	--contact-color-primary: var(--color-primary, #360034);
	--contact-color-primary-light: var(--color-primary-light ,#460044);
	--contact-color-primary-dark: var(--color-primary-dark, #260024);
	--contact-color-primary-darker: var(--color-primary-darker, #160014);
	--contact-color-primary-lighter: var(--color-primary-lighter, #560054);
	--contact-color-highlight: var(--color-primary-highlight, #E2D5E1);
}

html{
	min-width: 200px;
	min-height: 200px;
}

/*----- Main Toggle Conditional ------*/
#contactCTRL:checked ~ #contact{	/* Window */
	display: block;
} /* ELSE */
	#contact{
		display: none;
}
#contactCTRL:checked ~ #contact *{	/* Content */
	display: block;
} /* ELSE */
	#contact *{
		display: none;
}
/*--------------------------------*/

#contact{
	display: none;
	position: fixed;
	background-color: rgba(0,0,0,0.4);
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 3;
}

#contact *{
	display: none;
	color: var(--contact-color-highlight);
	text-decoration: none;
	text-align: center;
	border-radius: 10px;
}

#contact h1{
	font-size: 1.2em;
}
#contact > div{
	--size: 200;
	background-color: var(--contact-color-primary);
	box-shadow: 0 0 10px #000;
	border-radius: 10px;
	position: relative;
	width: calc(var(--size) * 1px);
	height: calc(var(--size) * 1px);
	top: calc(50% - calc(var(--size) * 0.5px));
	left: calc(50% - calc(var(--size) * 0.5px));
}
#contact > div > label{
	position: absolute;
	right: 0px;
	width: 20px;
	height: 20px;
	margin: 5px;
	padding: 5px;
	border: 1px solid var(--contact-color-primary-dark);
}
#contact > div > label:hover{
	background-color: var(--contact-color-primary-dark);
}
#contact > div > label > *{
	fill: var(--contact-color-primary-lighter)
}
#contact > div > address{
	position: relative;
	padding: 10px;
	top: 50%;
	transform: translateY(-50%);
}
#contact > div > address > a:hover{
	text-decoration: underline;
}

@media only screen and (max-width : 200px), screen and (max-height : 200px){
	/*Just invert the button controls here*/
	/*----- Main Toggle Conditional ------*/
	#contactCTRL:checked ~ #contact{	/* Window */
		display: none;
	} /* ELSE */
		#contact{
			display: block;
	}
	#contactCTRL:checked ~ #contact *{	/* Content */
		display: none;
	} /* ELSE */
		#contact *{
			display: block;
	}
	/*--------------------------------*/

	/*
	 * Change the background color for the dimming pannel so it doesn't
	 * look like crap if a user has a really short screen, or a really
	 * thin screen...
	 */

	#contact{
		background-color: var(--contact-color-primary);
	}
}
EOD;

?>
