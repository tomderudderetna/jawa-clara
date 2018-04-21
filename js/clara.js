const
	baseUri = "http://localhost/jawa-clara/v2",
	module_info = [],
	goal_info = [],
	/* selector css */
	selectorAllPanels = '#clara #tab-workspace .panel',
	/* nodes */
	nodeClara = document.getElementById('clara')

let
	selected_body = null,
	selected_type = null

window.onload = loader()

function init() {
	bind_initial()
	nodeClara.style.visibility = 'visible'
	step_info_start()
}

function step_info_start() {
	!module_info.length ?
		show(document.getElementById('tab-info')) :
		step_info_end()
}

function step_info_end() {
	hide(document.getElementById('tab-info'))
	step_goal_start()
}

function step_goal_start() {
	document.querySelector('#clara #process-line > .step:nth-child(2)').classList.add('active')
	!goal_info.length ?
		show(document.getElementById('tab-goal')) :
		step_goal_end()
}

function step_goal_end() {
	hide(document.getElementById('tab-goal'))
	step_workspace_start()
}

function step_workspace_start() {
	document.querySelector('#clara #process-line > .step:nth-child(3)').classList.add('active')
	document.querySelector('#clara #process-line > .step:nth-child(4)').classList.add('valid')
	show(document.getElementById('tab-workspace'))
	show(document.getElementById('nav_panel'), 1, 'flex')
}

function step_workspace_end() {
	downloader()
}

function show(node, fade, display) {
	node.style.display = display ? display : 'block'
	!fade ? node.classList.add('show') : node.style.opacity = '1'
}

function hide(node) {
	node.style.display = 'none'
}

function bind_initial() {
	bind_header()
	bind_menu()
	bind_modal()
	bind()
}

function bind_header() {
	document.getElementById('reload').onclick = function () {
		loader()
	}
	document.getElementById('download').onclick = function () {
		document.querySelector('#clara #process-line > .step:nth-child(4)').classList.remove('valid')
		document.querySelector('#clara #process-line > .step:nth-child(4)').classList.add('active')
		downloader()
	}
}

function bind_menu() {
	const btn_blocks = document.querySelectorAll('#clara #nav_panel > a')
	for (let i = 0; i < btn_blocks.length; i++) {
		btn_blocks[i].ondragstart = function () {
			selected_type = this.getAttribute('type')
		}
		btn_blocks[i].onclick = function () {
			alert(this.getAttribute('type'))
		}
	}
}

function bind_modal() {
	document.querySelector('#modal_body_edit> form > input[type="submit"]').onclick = function () {
		event.preventDefault();
		selected_body.innerHTML = document.querySelector('#modal_body_edit> form  textarea').value
		hide(document.getElementById('modal_body_edit'))
	}
	document.querySelector('#clara #tab-info form > input[type="submit"]').onclick = function (event) {
		event.preventDefault();
		const infos = document.querySelectorAll('#clara #tab-info form input:not([type="submit"])')
		for (let i = 0; i < infos.length; i++)
			module_info[infos[i].name] = infos[i].value
		use_module_info(module_info)
		step_info_end()
	}
	document.querySelector('#clara #tab-goal form > input[type="submit"]').onclick = function (event) {
		event.preventDefault();
		const infos = document.querySelectorAll('#clara #tab-goal form textarea')
		for (let i = 0; i < infos.length; i++)
			goal_info[infos[i].name] = infos[i].innerHTML
		use_goal_info(goal_info)
		step_goal_end()
	}
}

function bind() {
	const body = document.querySelectorAll('#tab-workspace .panel:not(.panel-module):not(.panel-objective) > .panel-body')
	for (let i = 0; i < body.length; i++) {
		body[i].onclick = function () {
			selected_body = this
			document.querySelector('#modal_body_edit> form  textarea').value = this.innerHTML
			show(document.getElementById('modal_body_edit'), 0)
		}
	}
	const zones_drop = document.querySelectorAll('#clara .drop_zone')
	for (let i = 0; i < zones_drop.length; i++) {
		zones_drop[i].ondragover = function (event) {
			event.preventDefault()
		}
		zones_drop[i].ondrop = function () {
			event.preventDefault()
			insertPannelAfter(this.nextSibling, selected_type)
		}
	}
	const btn_remove = document.querySelectorAll('#clara .panel_remove')
	for (let i = 0; i < btn_remove.length; i++) {
		btn_remove[i].onclick = function () {
			this.nextSibling.nextSibling.nextSibling.nextSibling.remove()
			this.nextSibling.nextSibling.remove()
			this.remove()
		}
	}
}

function loader() {
	get(baseUri + "/view", {}, function (res) {
		nodeClara.style.visibility = 'hidden'
		nodeClara.innerHTML = res
		window.setTimeout(function () {
			init()
		}, 1);
	})
}

function downloader() {
	download(generate(), "sujet.html", "text/html");
}

function generate() {
	let content = strPanelsType[0]
	const pannels = document.querySelectorAll(selectorAllPanels)
	for (let i = 0; i < pannels.length; i++)
		content += pannels[i].outerHTML
	content += strPanelsType[5]
	return content
}

function use_module_info(data) {
	const selector1 = '#tab-workspace .panel-module > .panel-'
	const selector2 = selector1 + 'body > table tr:nth-child('
	document.querySelector(selector1 + 'heading').innerHTML = data.module
	document.querySelector('#tab-workspace .panel-project > .panel-heading').innerHTML = data.project
	document.querySelector(selector2 + '1) > td:last-child').innerHTML = data.svn
	document.querySelector(selector2 + '2) > td:last-child').innerHTML = data.vm
	document.querySelector(selector2 + '3) > td:last-child').innerHTML = data.order
	document.querySelector(selector2 + '4) > td:last-child').innerHTML = data.correction
	document.querySelector(selector2 + '5) > td:last-child').innerHTML = data.time
	document.querySelector(selector2 + '6) > td:last-child').innerHTML = data.team
}

function use_goal_info(data) {
	document.querySelector('#tab-workspace .panel-objective > .panel-body').innerHTML = data.content
}

function insertPannelAfter(referenceNode, panelType) {
	const newNode = document.createElement('null')
	document.querySelector('#clara #tab-workspace > .tab-body').insertBefore(newNode, referenceNode)
	newNode.outerHTML = strPanelRemove + '\n' +
		strPanelsType[panelType] + '\n' +
		strZoneDrop + '\n'
	bind()
}

function get(url, opt, success, error) {
	const xhttp = new XMLHttpRequest()
	xhttp.onload = function () {
		(this.status === 200) ? success ? success(this.response) : null : error ? err(this.response) : null
	}
	xhttp.open('GET', url, true)
	for (const key in opt.headers)
		xhttp.setRequestHeader(key, opt.headers[key])
	xhttp.withCredentials = true;
	xhttp.send(opt.body)
}

const
	strZoneDrop = '<div class="drop_zone">drop here</div>',
	strPanelRemove = '<div class="panel_remove"><i class="fas fa-trash-alt"></i></div>',
	strPanelsType = [
		'<!DOCTYPE html>\n' +
		'<html>\n' +
		'\t<head>\n' +
		'\t\t<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n' +
		'\t\t<title>Module - Projet</title>\n' +
		'\t\t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">\n' +
		'\t\t<link rel="stylesheet" href="https://dl.etna-alternance.net/sujets/prism.css">\n' +
		'\t\t<link rel="stylesheet" href="https://dl.etna-alternance.net/sujets/sujet-etna-new.css">\n' +
		'\t\t<script type="text/javascript" src="https://dl.etna-alternance.net/sujets/prism.js"></script>\n' +
		'\t</head>\n' +
		'\t<body>\n',
		'\t\t<div class="panel panel-warning">\n' +
		'\t\t\t<div class="panel-heading">Attention</div>\n' +
		'\t\t\t<div class="panel-body">\n' +
		'\t\t\t\t<ul>\n' +
		'\t\t\t\t\t<li>Attention, on parle du login qu\'on vous a fourni dans les informations de connexion, pas votre login intra.</li>\n' +
		'\t\t\t\t</ul>\n' +
		'\t\t\t</div>\n' +
		'\t\t</div>\n',
		'\t\t<div class="panel panel-forbidden">\n' +
		'\t\t\t<div class="panel-heading">Interdits</div>\n' +
		'\t\t\t<div class="panel-body">\n' +
		'\t\t\t\t<ul>\n' +
		'\t\t\t\t\t<li>Vous n\'avez pas le droit à internet ni de tester le code en local.</li>\n' +
		'\t\t\t\t\t<li>Toute triche équivaut à un <code>-42</code>.</li>\n' +
		'\t\t\t\t\t<li>Toute communication (<i>téléphone, orale...</i>) est considérée comme de la triche.</li>\n' +
		'\t\t\t\t\t<li>Sous-liste :\n' +
		'\t\t\t\t\t\t<ul>\n' +
		'\t\t\t\t\t\t\t<li>Sous sous-liste\n' +
		'\t\t\t\t\t\t\t\t<ul>\n' +
		'\t\t\t\t\t\t\t\t\t<li>element 1</li>\n' +
		'\t\t\t\t\t\t\t\t\t<li>element 2</li>\n' +
		'\t\t\t\t\t\t\t\t</ul>\n' +
		'\t\t\t\t\t\t\t</li>\n' +
		'\t\t\t\t\t\t\t<li>test1</li>\n' +
		'\t\t\t\t\t\t</ul>\n' +
		'\t\t\t\t\t</li>\n' +
		'\t\t\t\t</ul>\n' +
		'\t\t\t</div>\n' +
		'\t\t</div>\n',
		'\t\t<div class="panel panel-info">\n' +
		'\t\t\t<div class="panel-heading">Informations</div>\n' +
		'\t\t\t<div class="panel-body">\n' +
		'\t\t\t\t<ul>\n' +
		'\t\t\t\t\t<li>Si vous avez besoin de plus d\'informations, n\'hésitez pas à contacter le prof</li>\n' +
		'\t\t\t\t</ul>\n' +
		'\t\t\t</div>\n' +
		'\t\t</div>\n',
		'\t\t<div class="panel panel-exercice">\n' +
		'\t\t\t<div class="panel-heading">Etape 1 : nom de l\'etape</div>\n' +
		'\t\t\t<div class="panel-body">\n' +
		'\t\t\t\t<pre><code class="language-javascript">code inline() + "tellement styled".length;</code></pre>\n' +
		'\t\t\t\t<p>Pour cette étape, vous devez implémenter une intelligence artificielle de jeu de dames.</p>\n' +
		'\t\t\t\t<p>Un affichage doit être effectué à chaque action.</p>\n' +
		'\t\t\t\t<p>En cas de fin de jeu, affichez le nom du vainqueur.</p>\n' +
		'\t\t\t</div>\n' +
		'\t\t</div>\n',
		'\t</body>\n' +
		'</html>\n'
	]

// Liens utiles

// https://css-tricks.com/snippets/css/keyframe-animation-syntax/
// https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-js-without-jquery/26736704#26736704
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// https://www.materialui.co/flatuicolors
// https://fontawesome.com/icons?d=gallery
// https://developer.mozilla.org/fr/docs/Web/API/WindowTimers/setTimeout
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondragstart
// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
// https://www.w3schools.com/cssref/sel_nth-child.asp
// https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
// http://danml.com/download.html
// https://developer.mozilla.org/fr/docs/Web/API/GlobalEventHandlers/onload