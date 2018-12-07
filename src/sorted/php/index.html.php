<!DOCTYPE html>
<!--[if IE 8]><html class="ie eq8 lt9 lt10 "><![endif]-->
<!--[if IE 9]><html class="ie eq9 lt10 "><![endif]-->
<!--[if IE 10]><html class="ie eq10 "><![endif]-->
<!--[if gt IE 10]><html class="ie "><![endif]-->
<!--[if !IE]><!-->
<html>
<!--<![endif]-->
	<head>
		<title id="@TITLE">@M3ITOR</title>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="About M3ITOR!">
		<meta name="keywords" content="Developer, Person, People">
		<meta name="author" content="M3TIOR">
		<link id="@LOGO" type="image/png" rel="favicon" href="favicon.png">
		<link id="@COLORS" type="text/css" rel="stylesheet" href="color.css" />
		<link id="@GLOW" type="text/css" rel="stylesheet" href="glow.css" />
		<link id="@POWER" type="text/css" rel="stylesheet" href="power.css" />
		<script id="@MUSCLE" type="text/javascript" src="muscle.js"></script>
		<style id="@NAVIGATION"><?php echo $navbar->css; ?></style>
		<style id="@CSS" type="text/css">
		/*
		 * M3TIOR 2017
		 */

		html{
			/*
			 * Global Variable / Value Descriptor Location
			 */
			--social-btn-size: 100;
			--social-btn-count: 5;
			--social-btn-perline: 3;
			--social-btn-separation: var(--social-btn-size);
			--social-btn-x-separation: calc(var(--social-btn-size) * 1);
			--social-btn-y-separation: calc(var(--social-btn-size) * 1);
			--social-pane-size-y: calc(var(--social-btn-size) * 2);
			--social-pane-size-x: 450;

			--subject-gutter-size: 2.5;
			--subject-padding-size: var(--subject-gutter-size);
			--subject-size: calc( 50 - calc(var(--subject-padding-size) + var(--subject-gutter-size)));
			--subject-perline: 1;

			/*--- GLOBAL FIXES ---*/
			-webkit-padding-start: 0px;
		}

		/* ICONS */
		[longdesc=Github]{
			src: url(icons/iconmonstr-github-1.svg);
			content: url(icons/iconmonstr-github-1.svg);
		}
		/*
		[longdesc=Gitbook]{
			src: url(https://avatars2.githubusercontent.com/u/7111340?v=3&s=400);
			content: url(https://avatars2.githubusercontent.com/u/7111340?v=3&s=400);
		}
		*/
		[longdesc=Linkedin]{
			src: url(icons/iconmonstr-linkedin-4.svg);
			content: url(icons/iconmonstr-linkedin-4.svg);
		}
		[longdesc=Youtube]{
			src: url(icons/iconmonstr-youtube-4.svg);
			content: url(icons/iconmonstr-youtube-4.svg);
		}
		[longdesc=Soundcloud]{
			src: url(icons/iconmonstr-soundcloud-4.svg);
			content: url(icons/iconmonstr-soundcloud-4.svg);
		}
		[longdesc=DeviantArt]{
			src: url(icons/iconmonstr-deviantart-4.svg);
			content: url(icons/iconmonstr-deviantart-4.svg);
		}

		body{
			padding: 0px;
			margin: 0px;
			background-color: var(--color-primary);
			color: var(--color-highlight);
		}
		h1, h2, h3, p{
			text-align: center;
		}
		p{
			vertical-align: top;
		}

		#content *{
			padding-left: 2.5%;
			padding-right: 2.5%;
			padding-top: 10px;
			padding-bottom: 10px;
			margin-bottom: 10px;
		}

		#social{
			overflow-x: scroll;
		}
		#social *{
			padding:0px;
			margin:0px;
			width: 100%;
			height: 100%;
		}
		#social ul{
			height: calc(var(--social-pane-size-y) * 1px);
		}
		#social div:nth-child(2){
			width: calc(var(--social-pane-size-x, 450) * 1px);
		}
		#social li{
			display: inline-block;
			height: 50%;
			width: 0px;
			float: left;
			line-height: 0px;
			padding-left: calc( calc( 1 / var(--social-btn-perline) ) * 50%);
			padding-right: calc( calc( 1 / var(--social-btn-perline) ) * 50%);
		}
		#social li:nth-child(4){
			margin-left: calc( calc( 1 / var(--social-btn-perline) ) * 50%);
		}
		#social a{
			display: block;
			transform: translateX(-50%);
			background-color: var(--color-primary);
			border-radius: calc(var(--social-btn-size) * 1px);
			width: calc(var(--social-btn-size) * 1px);
			height: calc(var(--social-btn-size) * 1px);
		}
		#social ::-webkit-scrollbar-thumb{
			background-color: var(--color-primary-light);
		}
		#social ::-webkit-scrollbar{
			background-color: var(--color-primary-darker);
		}

		.subject{
			padding: calc(var(--subject-padding-size) * 1%) !important;
			margin-bottom: 0px;
			margin: calc(var(--subject-gutter-size) * 1%);
			padding-left: 0px !important;
			padding-right: 0px !important;
		}
		.topic{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			padding-left: 0px !important;
			padding-right: 0px !important;
		}
		.topic > h1, .topic > h2, .topic > h3{
			flex: 1 0 50%;
		}

		.Hcenter{
			display: block !important;
			margin-left: auto !important;
			margin-right: auto !important;
		}
		.Vcenter{
			display: block !important;
			margin-top: auto !important;
			margin-down: auto !important;
		}
		.center{
			display: block !important;
			margin: auto !important;
		}

		@media only screen and (min-width : 481px){
			.subject{
				flex-basis: calc(calc(var(--subject-size) * 1%) - 4px);
			}
		}
		</style>
		<script id="@JS" type="text/javascript">

		</script>
	</head>
	<body data-skin="">
		<?php echo $navbar->html; ?>
		<div id="content">
			<div class="color-primary-light full">
				<h1 style="text-align: center;">
					Ruby Allison Rose
				</h1>
				<h3 style="text-align: center;">
					I'm not your average programmer  ;)
				</h3>
			</div>
			<div id="social" class="color-primary-dark full">
				<!-- Links -->
				<h3 class="bone">Find me on:</h3>
				<div class="Hcenter">
					<ul>
						<li>
							<div class="bone">
								<span>
									<b>Github : </b>
								</span>
								<a href="https://www.github.com/M3TIOR">
									https://www.github.com/M3TIOR
								</a>
							</div>
							<a href="https://www.github.com/M3TIOR">
								<img longdesc="Github"></img>
							</a>
						</li>
						<li>
							<div class="bone">
								<span>
									<b>Linkedin : </b>
								</span>
								<a href="https://www.linkedin.com/in/ruby-rose-489464151/">
									linkedin.com/in/ruby-rose-489464151/
								</a>
							</div>
							<a href="https://wwww.linkedin.com/in/ruby-rose-489464151/">
								<img longdesc="Linkedin"></img>
							</a>
						</li>
						<li>
							<div class="bone">
								<span>
									<b>Youtube : </b>
								</span>
								<a href="https://www.youtube.com/channel/UChyesz_3CwKm5EMa_fPpwgQ">
									https://www.youtube.com/channel/UChyesz_3CwKm5EMa_fPpwgQ
								</a>
							</div>
							<a href="https://www.youtube.com/channel/UChyesz_3CwKm5EMa_fPpwgQ">
								<img longdesc="Youtube"></img>
							</a>
						</li>
						<li>
							<div class="bone">
								<span>
									<b>DeviantArt : </b>
									<a href="https://m3tior.deviantart.com/">
										https://m3tior.deviantart.com/
									</a>
								</span>
							</div>
							<a href="https://m3tior.deviantart.com/">
								<img longdesc="DeviantArt"></img>
							</a>
						</li>
						<li>
							<div class="bone">
								<span>
									<b>Soundcloud : </b>
									<a href="https://soundcloud.com/m3tior">
										https://soundcloud.com/m3tior
									</a>
								</span>
							</div>
							<a href="https://soundcloud.com/m3tior">
								<img longdesc="Soundcloud"></img>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="color-primary-light">
				<div class="color-primary-lighter">
					<div class="color-primary">
						<h2>Who I am</h2>
						<p class="Hcenter">
							I'm a programmer, philosopher, artist, musician, you name it.
							I started programming in 2013 when I took a video-game programming class
							my sophomore year of highschool. I'd already had an interest in game
							design from my countless hours of playing them. So I did the logical thing
							and followed through with my curiosity. Needless to say it was one of the best
							decisions I ever made.

							After that I went on to join the Stormbots team 2811 of Skyvew Highschool durring
							my junior year. I was fortunate to have a great mentor and many supportive peers
							that really helped to foster my love for engeneering and data science.
						</p>
					<div>
				</div>
				<div class="topic color-primary-dark">
					<h2>My experience</h2>
					<div class="subject color-primary-darker">
						<h3>Linux</h3>
						<p>
							I've been working on Linux platforms since my first year of robotics
							when my old friend <a href="https://apachano.github.io">Austin</a> introduced me to them.
							I've done networking, administration, and embeded developement using it.
							To this date linux mint is only operating system I use every day.
						</p>
					</div>
					<div class="subject color-primary-darker">
						<h3>W3C</h3>
						<p>
							I've been working with web technologies for about five years now. I'm up to date
							on all the latest web technologies and trends because I have a genuine interest in them.
							Whether it be a barebones HTML doc you're looking for, a styleized theme in CSS for your
							Gnome desktop, or an electron app for your company, I got you covered. I also have just as much
							experience in backend with PHP and Python too. ;)
						</p>
					</div>
					<div class="subject color-primary-darker">
						<h3>Native</h3>
						<p>
							I have five-plus years of experience using C, one year of experience using C++,
							and experience using Assembly from my shenanigans trying to make my own kernel.
							Soon I'm looking to expand my experience to include Rust as well since it looks to be the
							next up and comming solution for native development.
						</p>
					</div>
					<div class="subject color-primary-darker">
						<h3>Mobile</h3>
						<p>
							My experience with Java dates back to my second year of video-game-programming
							and I have some experience developing for Android platforms.
							But I still have a lot to learn and I'm working on improving my skills every day.
						</p>
					</div>
				</div>
				<noscript class="bone">
					<b><i>
						If you see this, it means you're either debugging, or loaded
						the page in html-only mode. Congratulations! This is my cover letter!
						Don't you feel so accomplished now? ... or you're using something like w3m...
						mer...
					</i></b>
				</noscript>
			</div>
		</div>
	</body>
</html>
