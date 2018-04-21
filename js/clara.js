/* <================================== classes =======================================> */
class Mold {
	constructor(url = baseUri + '/view/template.html') {
		this.url = url
		this.raw = null
		this.node = null
		this.panels = {}
		this.rawToDOM().then(() => {
			for (const type of pannelTypes)
				this.panels[type] = this.node.querySelector('.panel-' + type)
			// console.log(this.panels)
		})
	}

	// get panelModule() {
	// 	return this.node.querySelector('.panel-module')
	// }
	//
	// get panelObjective() {
	// 	return this.node.querySelector('.panel-objective')
	// }
	//
	// get panelOProject() {
	// 	return this.node.querySelector('.panel-project')
	// }
	//
	// get panelWarning() {
	// 	return this.node.querySelector('.panel-warning')
	// }
	//
	// get panelForbidden() {
	// 	return this.node.querySelector('.panel-forbidden')
	// }
	//
	// get panelInfo() {
	// 	return this.node.querySelector('.panel-info')
	// }

	getRaw() {
		return new Promise((next) => {
			get(this.url, {}, (res) => {
				this.raw = res
				next()
			})
		})
	}

	rawToDOM() {
		return new Promise((next) => {
			this.getRaw().then(() => {
				this.node = document.createElement('div')
				this.node.innerHTML = this.raw
				next()
			})
		})
	}
}

const
	baseUri = "http://localhost/jawa-clara/v2",
	module_info = [],
	goal_info = [],
	/* selector css */
	selectorAllPanels = '#clara #tab-workspace .panel',
	/* nodes */
	nodeClara = document.getElementById('clara'),
	pannelTypes = [
		'module',
		'objective',
		'project',
		'warning',
		'forbidden',
		'info',
		'exercice',
		'question',
		'example',
	],
	template = new Mold()
let
	moldPanels = null,
	module_name = '',
	project_name = '',
	selected_body = null,
	selected_type = null,
	nodeTabInfo = null,
	nodeTabGoal = null,
	nodeTabWorkspace = null,
	NodeBodyEdit = null

window.onload = loader()

function init() {
	bind_initial()
	nodeTabInfo = document.getElementById('tab-info')
	nodeTabGoal = document.getElementById('tab-goal')
	nodeTabWorkspace = document.getElementById('tab-workspace')
	NodeBodyEdit = document.querySelector('#modal_body_edit> form .content')
	nodeClara.style.visibility = 'visible'
	insertPannel('module')
	insertPannel('project')
	insertPannel('objective')
	step_info_start()
	// step_goal_start()
}

function step_info_start() {
	showTab(nodeTabInfo)
	// !module_info.length ?
	// 	show(document.getElementById('tab-info')) :
	// 	step_info_end()
}

function step_info_end() {
	// hide(nodeTabInfo)
	set_module_info()
	use_module_info()
	step_goal_start()
}

function step_goal_start() {
	if (!panelExist('objective'))
		insertPannel('objective')
	document.querySelector('#clara #process-line > .step:nth-child(2)').classList.add('active')
	showTab(nodeTabGoal)
}

function step_goal_end() {
	// hide(nodeTabGoal)
	step_workspace_start()
}

function step_workspace_start() {
	document.querySelector('#clara #process-line > .step:nth-child(1)').onclick = function () {
		step_info_start()
	}
	document.querySelector('#clara #process-line > .step:nth-child(2)').onclick = function () {
		step_goal_start()
	}
	document.querySelector('#clara #process-line > .step:nth-child(3)').onclick = function () {
		step_workspace_start()
	}
	document.getElementById('download').onclick = function () {
		step_workspace_end()
	}
	document.querySelector('#clara #process-line > .step:nth-child(3)').classList.add('active')
	document.querySelector('#clara #process-line > .step:nth-child(4)').classList.add('valid')
	showTab(nodeTabWorkspace)
}

function step_workspace_end() {
	document.querySelector('#clara #process-line > .step:nth-child(4)').classList.remove('valid')
	document.querySelector('#clara #process-line > .step:nth-child(4)').classList.add('active')
	downloader()
}

function show(node, fade, display) {
	node.style.display = display ? display : 'block'
	!fade ? node.classList.add('show') : node.style.opacity = '1'
}

function hide(node) {
	node.style.display = 'none'
	node.style.opacity = '0	'
	node.classList.remove('show')
}

function showTab(nodeTab) {
	nodeTab !== nodeTabInfo ? hide(nodeTabInfo) : show(nodeTab)
	nodeTab !== nodeTabGoal ? hide(nodeTabGoal) : show(nodeTab)
	nodeTab !== nodeTabWorkspace ? hide(nodeTabWorkspace) : show(nodeTab)
	nodeTab !== nodeTabWorkspace ? hide(document.getElementById('nav_panel')) : show(document.getElementById('nav_panel'), 1, 'flex')
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
	const btn_text = document.querySelectorAll('#clara #nav_text > a')
	for (let i = 0; i < btn_text.length; i++) {
		btn_text[i].onclick = function (e) {
			e.preventDefault()
			document.execCommand(this.getAttribute('action'), false, null);
		}
	}
}

function bind_modal() {
	document.querySelector('#modal_body_edit> form input[type="submit"]').onclick = function () {
		event.preventDefault()
		selected_body.innerHTML = NodeBodyEdit.innerHTML
		hide(document.getElementById('modal_body_edit'))
	}
	document.querySelector('#clara #tab-info form input[type="submit"]').onclick = function (event) {
		event.preventDefault()
		step_info_end()
	}
	document.querySelector('#clara #tab-goal form input[type="submit"]').onclick = function (event) {
		event.preventDefault()
		goal_info.content = document.querySelector('#clara #tab-goal form .content').innerHTML
		use_goal_info(goal_info)
		step_goal_end()
	}
}

function bind() {
	const edit_body = document.querySelectorAll('#tab-workspace .panel_remove > i.fa-edit')
	for (let i = 0; i < edit_body.length; i++)
		edit_body[i].onclick = function () {
			this.parentNode.nextSibling.nextSibling.querySelector('.panel-body').click()
		}
	const body = document.querySelectorAll('#tab-workspace .panel:not(.panel-module):not(.panel-objective) > .panel-body')
	for (let i = 0; i < body.length; i++)
		body[i].onclick = function () {
			selected_body = this
			NodeBodyEdit.innerHTML = this.innerHTML
			show(document.getElementById('modal_body_edit'), 0)
		}
	const btn_remove = document.querySelectorAll('#clara .panel_remove > i.fa-trash-alt')
	for (let i = 0; i < btn_remove.length; i++) {
		btn_remove[i].onclick = function () {
			const parentNode = this.parentNode
			parentNode.nextSibling.nextSibling.nextSibling.nextSibling.remove()
			parentNode.nextSibling.nextSibling.remove()
			parentNode.remove()
		}
	}
}

function loader() {
	// template.getRaw(baseUri + '/view/template.html').then(function () {
	// 	moldPanels = template.rawToDOM()
	// 	console.log(template.node.querySelector('.panel-objective'))
	// })
	get(baseUri + "/view/index.html", {}, function (res) {
		nodeClara.style.visibility = 'hidden'
		nodeClara.innerHTML = res
		window.setTimeout(function () {
			init()
		}, 1)
	})
	// })
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

function set_module_name() {
	const node = document.querySelector('#clara #tab-info input[name="module"]')
	module_name = node.value ? node.value : null
}

function set_project_name() {
	const node = document.querySelector('#clara #tab-info input[name="project"]')
	project_name = node.value ? node.value : null
}

function set_module_info(data) {
	set_module_name()
	set_project_name()
	const infos = document.querySelectorAll('#clara #tab-info form input[name^=":"]')
	for (let i = 0; i < infos.length; i++)
		module_info[infos[i].name] = infos[i].value != '' ? infos[i].value : null
}

function get_module_name() {
	document.querySelector(selectorAllPanels + '-module > .panel-heading').innerHTML = module_name ? module_name : '???'
}

function get_project_name() {
	document.querySelector(selectorAllPanels + '-project > .panel-heading').innerHTML = project_name ? project_name : '???'
}

function get_module_info(key, value) {
	const parentNode = document.querySelector(selectorAllPanels + '-module tbody ')
	const newNode = document.createElement('tr')
	parentNode.appendChild(newNode)
	newNode.innerHTML = '<td>' + key + '</td>' + '<td>' + value + '</td>'
}

function use_module_info() {
	const infos = [
		['Rendu', ':svn'],
		['VM', ':vm'],
		['Rendu', ':order'],
		['Correction', ':correction'],
		['Temps', ':time'],
		['Effectif', ':team']
	]
	get_module_name()
	get_project_name()
	const parentNode = document.querySelector(selectorAllPanels + '-module tbody ')
	while (parentNode.firstChild)
		parentNode.removeChild(parentNode.firstChild)
	for (let key = 0; key < infos.length; key++) {
		if (module_info[infos[key][1]])
			get_module_info(infos[key][0], module_info[infos[key][1]])
	}
}

function use_goal_info(data) {
	document.querySelector('#tab-workspace .panel-objective > .panel-body').innerHTML = data.content
}

function insertDropZone() {
	console.log('insert drop zone')
	const paentNode = document.querySelector('#tab-workspace > .tab-body')
	const newNode = document.createElement('div')
	newNode.classList.add('drop_zone')
	newNode.textContent = 'drop here'
	newNode.ondragover = function (event) {
		event.preventDefault()
	}
	newNode.ondrop = function () {
		event.preventDefault()
		insertPannelAfter(this.nextSibling, selected_type)
	}
	paentNode.appendChild(newNode)
}

function insertPannel(type) {
	console.log('insert pannel ', type)
	const paentNode = document.querySelector('#tab-workspace > .tab-body')
	const newNode = template.panels[type]
	paentNode.appendChild(newNode)
	insertDropZone()
}

function panelExist(type) {
	return document.querySelectorAll('#tab-workspace .panel-' + type).length > 0
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
	strPanelRemove = '<div class="panel_remove"><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></div>',
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

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fléchées
// https://www.w3schools.com/css/css_attribute_selectors.asp
// https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
// http://jakiestfu.github.io/Medium.js/docs/
// https://i.pinimg.com/564x/1e/75/ea/1e75eaae980b514d42a9bf3a24c7de6b.jpg
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