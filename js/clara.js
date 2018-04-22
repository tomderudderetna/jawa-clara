/* <================================== classes =======================================> */
class Clara {
	constructor() {
		this.moduleName = ''
		this.projectName = ''
		this.selectedType = ''
		this.panelsTypes = [
			'module',
			'objective',
			'project',
			'warning',
			'forbidden',
			'info',
			'exercice',
			'question',
			'example',
		]
		this.moduleInfo = []
		this.steps = {
			info: {
				start: () => {
					showTab(nodeTabInfo)
				},
				end: () => {
					set_module_info()
					use_module_info()
					clara.steps.goal.start()
				}
			},
			goal: {
				start: () => {
					if (!panelExist('objective'))
						insertPannel('objective')
					document.querySelector('#clara #process-line > .step:nth-child(2)').classList.add('active')
					showTab(nodeTabGoal)
				},
				end: () => {
					clara.steps.workspace.start()
				}
			},
			workspace: {
				start: () => {
					document.querySelector('#clara #process-line > .step:nth-child(1)').onclick = function () {
						clara.steps.info.start()
					}
					document.querySelector('#clara #process-line > .step:nth-child(2)').onclick = function () {
						clara.steps.goal.start()
					}
					document.querySelector('#clara #process-line > .step:nth-child(3)').onclick = function () {
						clara.steps.workspace.start()
					}
					document.getElementById('download').onclick = function () {
						clara.steps.workspace.end()
					}
					document.querySelector('#clara #process-line > .step:nth-child(3)').classList.add('active')
					document.querySelector('#clara #process-line > .step:nth-child(4)').classList.add('valid')
					showTab(nodeTabWorkspace)
				},
				end: () => {
					document.querySelector('#clara #process-line > .step:nth-child(4)').classList.remove('valid')
					document.querySelector('#clara #process-line > .step:nth-child(4)').classList.add('active')
					downloader()
				}
			}
		}
	}
}

class Mold {
	constructor(url = window.location + '/view/template.html') {
		this.url = url
		this.raw = null
		this.node = null
		this.panels = {}
		this.rawToDOM().then(() => {
			for (const type of clara.panelsTypes)
				this.panels[type] = this.node.querySelector('.panel-' + type)
		})
	}

	getRaw() {
		return new Promise((next) => {
			Ajax.get(this.url, {}, (res) => {
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

class Ajax {
	static get(url, opt, success, error) {
		const xhttp = new XMLHttpRequest()
		xhttp.onload = function () {
			(this.status === 200) ? success ? success(this.response) : null : error ? err(this.response) : null
		}
		xhttp.open('GET', url, true)
		for (const key in opt.headers)
			xhttp.setRequestHeader(key, opt.headers[key])
		xhttp.send(opt.body)
	}
}

/* <================================== globales =======================================> */
const
	nodeClara = document.getElementById('clara')

let
	selected_body = null,
	nodeTabInfo = null,
	nodeTabGoal = null,
	nodeTabWorkspace = null,
	NodeBodyEdit = null

// selector
const
	S_CLARA = '#clara ',
	S_TAB_INFO = S_CLARA + '#tab-info ',
	S_PANNELS = S_CLARA + '#tab-workspace .panel',
	S_SUBMIT_OBJECTIF = S_CLARA + '#modal_body_edit input[type="submit"]'

// object
const
	clara = new Clara(),
	template = new Mold()

/* <================================ document ready =====================================> */
window.onload = loader()

/* <================================ functions =====================================> */

function show(node, fade, display) {
	node.style.display = display ? display : 'block'
	node.classList.add(!fade ? 'fadeOn' : 'fadeOff')
}

function hide(node) {
	node.style.display = 'none'
	node.style.opacity = '0'
	node.classList.remove('fadeOn')
}

function showTab(nodeTab) {
	nodeTab !== nodeTabInfo ? hide(nodeTabInfo) : show(nodeTab)
	nodeTab !== nodeTabGoal ? hide(nodeTabGoal) : show(nodeTab)
	nodeTab !== nodeTabWorkspace ? hide(nodeTabWorkspace) : show(nodeTab)
	nodeTab !== nodeTabWorkspace ? hide(document.getElementById('nav_panel')) : show(document.getElementById('nav_panel'), 1, 'flex')
}

function bind_menu() {
	const btn_blocks = document.querySelectorAll('#clara #nav_panel > a')
	for (let i = 0; i < btn_blocks.length; i++) {
		btn_blocks[i].ondragstart = function () {
			clara.selectedType = this.getAttribute('type')
		}
		btn_blocks[i].onclick = function () {
			alert(this.getAttribute('type'))
		}
	}
	const btn_text = document.querySelectorAll('#clara #nav_text > a')
	for (let i = 0; i < btn_text.length; i++) {
		btn_text[i].onfocus = function (e) {
			e.preventDefault()
		}
		btn_text[i].onclick = function (e) {
			e.preventDefault()
			document.execCommand(this.getAttribute('action'), false, null);
		}
	}
}

function bind_modal() {
	document.querySelector(S_SUBMIT_OBJECTIF).onclick = () => {
		event.preventDefault()
		selected_body.innerHTML = NodeBodyEdit.innerHTML
		hide(document.getElementById('modal_body_edit'))
	}
	document.querySelector('#clara #tab-info form input[type="submit"]').onclick = function (event) {
		event.preventDefault()
		clara.steps.info.end()
	}
	document.querySelector('#clara #tab-goal form input[type="submit"]').onclick = function (event) {
		event.preventDefault()
		use_goal_info(document.querySelector('#clara #tab-goal form .content').innerHTML)
		clara.steps.goal.end()
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
	nodeClara.style.visibility = 'hidden'
	Ajax.get(window.location + "/view/index.html", {}, function (res) {
		nodeClara.innerHTML = res
		window.setTimeout(function () {
			document.getElementById('reload').onclick = () => {
				loader()
			}
			bind_menu()
			bind_modal()
			bind()
			nodeTabInfo = document.getElementById('tab-info')
			nodeTabGoal = document.getElementById('tab-goal')
			nodeTabWorkspace = document.getElementById('tab-workspace')
			NodeBodyEdit = document.querySelector('#modal_body_edit> form .content')
			nodeClara.style.visibility = 'visible'
			insertPannel('module')
			insertPannel('objective')
			insertPannel('project')
			clara.steps.info.start()
		}, 1)
	})
}

function downloader() {
	download(generate(), "sujet.html", "text/html");
}

function generate() {
	let content = template.raw.substring(0, 527)
	const pannels = document.querySelectorAll(S_PANNELS)
	for (let i = 0; i < pannels.length; i++)
		content += pannels[i].outerHTML
	content += template.raw.substring(template.raw.length - 17, template.raw.length)
	return content
}

function set_module_info() {
	let node = null
	node = document.querySelector(S_TAB_INFO + 'input[name="module"]')
	clara.moduleName = node.value ? node.value : null
	node = document.querySelector(S_TAB_INFO + 'input[name="project"]')
	clara.projectName = node.value ? node.value : null
	const infos = document.querySelectorAll('#clara #tab-info form input[name^=":"]')
	for (let i = 0; i < infos.length; i++)
		clara.moduleInfo[infos[i].name] = infos[i].value != '' ? infos[i].value : null
}

function get_module_name() {
	document.querySelector(S_PANNELS + '-module > .panel-heading').innerHTML = clara.moduleName ? clara.moduleName : '???'
}

function get_project_name() {
	document.querySelector(S_PANNELS + '-project > .panel-heading').innerHTML = clara.projectName ? clara.projectName : '???'
}

function get_module_info(key, value) {
	const parentNode = document.querySelector(S_PANNELS + '-module table ')
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
	const parentNode = document.querySelector(S_PANNELS + '-module table ')
	while (parentNode.firstChild)
		parentNode.removeChild(parentNode.firstChild)
	for (let key = 0; key < infos.length; key++) {
		if (clara.moduleInfo[infos[key][1]])
			get_module_info(infos[key][0], clara.moduleInfo[infos[key][1]])
	}
}

function use_goal_info(data) {
	document.querySelector('#tab-workspace .panel-objective > .panel-body').innerHTML = data
}

function newNodeEditPannel() {
	'<div class="panel_remove"><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></div>'
	const newNode = document.createElement('div')
	newNode.classList.add('panel_remove')
	newNode.innerHTML = '<i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i>'
	return newNode
}

function newNodeDropZone() {
	const newNode = document.createElement('div')
	newNode.classList.add('drop_zone')
	newNode.textContent = 'drop here'
	newNode.ondragover = function (e) {
		e.preventDefault()
	}
	newNode.ondrop = function (e) {
		e.preventDefault()
		console.log(clara.selectedType)
		insertPannelAfter(this.nextSibling, clara.selectedType)
	}
	return newNode
}

function insertEditPannelButton() {
	const parentNode = document.querySelector('#tab-workspace > .tab-body')
	parentNode.appendChild(newNodeEditPannel())
}

function insertDropZone() {
	const parentNode = document.querySelector('#tab-workspace > .tab-body')
	parentNode.appendChild(newNodeDropZone())
}

function insertPannel(type) {
	insertEditPannelButton()
	const paentNode = document.querySelector('#tab-workspace > .tab-body')
	const newNode = template.panels[type]
	paentNode.appendChild(newNode)
	insertDropZone()
}

function panelExist(type) {
	return document.querySelectorAll('#tab-workspace .panel-' + type).length > 0
}

function insertPannelAfter(referenceNode, type) {
	const newNode = template.panels[type].cloneNode(true)
	document.querySelector('#clara #tab-workspace > .tab-body').insertBefore(newNodeEditPannel(), referenceNode)
	document.querySelector('#clara #tab-workspace > .tab-body').insertBefore(newNode, referenceNode)
	document.querySelector('#clara #tab-workspace > .tab-body').insertBefore(newNodeDropZone(), referenceNode)
}

// Liens utiles

// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
// https://developer.mozilla.org/fr/docs/Web/API/Node/cloneNode
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