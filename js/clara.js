/* <================================== classes =======================================> */
class Clara {
	constructor() {
		this.node = document.getElementById('clara')
		this.selectedBody = null
		this.selectedHeading = null
		this.stepMax = 0
		this.next = null
		this.useObjective = true
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
					this.startStepInfo()
				},
				end: () => {
					this.endStepInfo()
				},
				node: null
			},
			goal: {
				start: () => {
					this.startStepGoal()
				},
				end: () => {
					this.endStepGoal()
				},
				node: null
			},
			workspace: {
				start: () => {
					this.startStepWspace()
				},
				end: () => {
					this.endStepWspace()
				},
				node: null
			}
		}
	}

	startStepInfo() {
		this.next = (this.stepMax) ? this.steps.workspace.start : this.steps.goal.start
		showTab(this.steps.info.node)
	}

	endStepInfo() {
		set_module_info()
		use_module_info()
		this.next()
	}

	startStepGoal() {
		this.stepMax = 1
		this.next = this.steps.workspace.start
		document.querySelector('#clara #process-line > .step:nth-child(2)').classList.add('active')
		showTab(this.steps.goal.node)
	}

	endStepGoal() {
		this.next()
	}

	startStepWspace() {
		document.querySelector('#clara #process-line > .step:nth-child(1)').onclick = () => {
			this.steps.info.start()
		}
		document.querySelector('#clara #process-line > .step:nth-child(2)').onclick = () => {
			this.steps.goal.start()
		}
		document.querySelector('#clara #process-line > .step:nth-child(3)').onclick = () => {
			this.steps.workspace.start()
		}
		document.getElementById('download').onclick = () => {
			this.steps.workspace.end()
		}
		document.querySelector('#clara #process-line > .step:nth-child(3)').classList.add('active')
		document.querySelector('#clara #process-line > .step:nth-child(4)').classList.add('valid')
		showTab(this.steps.workspace.node)
	}

	endStepWspace() {
		document.querySelector('#clara #process-line > .step:nth-child(4)').classList.remove('valid')
		document.querySelector('#clara #process-line > .step:nth-child(4)').classList.add('active')
		downloader()
	}

	enableObjectifPanel() {
		this.useObjective = true
		if (!panelExist('objective'))
			insertPannel('objective')
		use_goal_info(document.querySelector('#clara #tab-goal form .content').innerHTML)
	}

	disableObjectifPanel() {
		this.useObjective = false
		panelExist('objective') ? this.removePanelToWspace(document.querySelector(S_TAB_WSPACE + '.panel-objective')) : null
	}

	removePanelToWspace(node) {
		const parentNode = document.querySelector(S_TAB_WSPACE + '> .tab-body')
		parentNode.removeChild(node.previousSibling)
		parentNode.removeChild(node.nextSibling)
		parentNode.removeChild(node)
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

class Subject {
	static generate() {
		const opt = {
			brace_style: "collapse",
			break_chained_methods: false,
			comma_first: false,
			e4x: false,
			end_with_newline: false,
			indent_char: " ",
			indent_inner_html: false,
			indent_scripts: "normal",
			indent_size: "4",
			jslint_happy: false,
			keep_array_indentation: false,
			max_preserve_newlines: "5",
			preserve_newlines: true,
			space_before_conditional: true,
			unescape_strings: false,
			wrap_line_length: "0"
		}
		let content = template.raw.substring(0, 527)
		const pannels = document.querySelectorAll(S_PANNELS)
		for (let i = 0; i < pannels.length; i++)
			content += pannels[i].outerHTML
		content += template.raw.substring(template.raw.length - 17, template.raw.length)
		return html_beautify(content, opt)
		// return content
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

/* <============================== globales slector and objects ===================================> */
const
	S_CLARA = '#clara ',
	S_SUBMIT = 'input[type="submit"]',
	S_TAB_INFO = S_CLARA + '#tab-info ',
	S_TAB_GOAL = S_CLARA + '#tab-goal ',
	S_TAB_WSPACE = S_CLARA + '#tab-workspace ',
	S_MODAL_BODY = S_CLARA + '#modal_body_edit ',
	S_MODAL_HEADING = S_CLARA + '#modal_heading_edit ',
	S_PANNELS = S_CLARA + '#tab-workspace .panel',
	S_SUBMIT_MODAL = S_MODAL_BODY + S_SUBMIT,
	S_SUBMIT_MODAL2 = S_MODAL_HEADING + S_SUBMIT,
	S_SUBMIT_INFO = S_TAB_INFO + S_SUBMIT,
	S_SUBMIT_GOAL = S_TAB_GOAL + S_SUBMIT,
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
	nodeTab !== clara.steps.info.node ? hide(clara.steps.info.node) : show(nodeTab)
	nodeTab !== clara.steps.goal.node ? hide(clara.steps.goal.node) : show(nodeTab)
	nodeTab !== clara.steps.workspace.node ? hide(clara.steps.workspace.node) : show(nodeTab)
	nodeTab !== clara.steps.workspace.node ? hide(document.getElementById('nav_panel')) : show(document.getElementById('nav_panel'), 1, 'flex')
}

function bindInitial() {
	const btn_blocks = document.querySelectorAll('#clara #nav_panel > a')
	for (let i = 0; i < btn_blocks.length; i++) {
		btn_blocks[i].ondragstart = function () {
			clara.selectedType = this.getAttribute('type')
		}
		btn_blocks[i].onclick = function () {
			alert(this.getAttribute('type'))
		}
	}
	const btn_text = document.querySelectorAll('#clara .nav_text > a')
	for (let i = 0; i < btn_text.length; i++) {
		btn_text[i].onfocus = function (e) {
			e.preventDefault()
		}
		btn_text[i].onclick = function (e) {
			e.preventDefault()
			document.execCommand(this.getAttribute('action'), false, null);
		}
	}
	document.querySelector(S_SUBMIT_INFO).onclick = () => {
		clara.steps.info.end()
	}
	document.querySelector(S_SUBMIT_GOAL).onclick = () => {
		document.querySelector(S_TAB_GOAL + ' input[type="checkbox"]').checked ?
			clara.disableObjectifPanel() :
			clara.enableObjectifPanel()
		clara.steps.goal.end()
	}
	document.querySelector(S_SUBMIT_MODAL).onclick = () => {
		clara.selectedBody.innerHTML = document.querySelector(S_MODAL_BODY + '.content').innerHTML
		hide(document.querySelector(S_MODAL_BODY))
	}
	document.querySelector(S_SUBMIT_MODAL2).onclick = () => {
		clara.selectedHeading.textContent = document.querySelector(S_MODAL_HEADING + 'input[name="content"]').value
		hide(document.querySelector(S_MODAL_HEADING))
	}
	bind()
}

function bind() {
	const body = document.querySelectorAll('#tab-workspace .panel:not(.panel-module):not(.panel-objective) > .panel-body')
	for (let i = 0; i < body.length; i++)
		body[i].onclick = function () {
			clara.selectedBody = this
			document.querySelector(S_MODAL_BODY + '.content').innerHTML = this.innerHTML
			show(document.querySelector(S_MODAL_BODY), 1)
		}
	const title = document.querySelectorAll('#tab-workspace .panel:not(.panel-module):not(.panel-objective) > .panel-heading')
	for (let i = 0; i < title.length; i++)
		title[i].onclick = function () {
			clara.selectedHeading = this
			document.querySelector(S_MODAL_HEADING + 'input[name="content"]').value = this.textContent
			show(document.querySelector(S_MODAL_HEADING), 1)
		}
	const edit_body = document.querySelectorAll('#tab-workspace .panel_remove > i.fa-edit')
	for (let i = 0; i < edit_body.length; i++)
		edit_body[i].onclick = function () {
			this.parentNode.nextSibling.querySelector('.panel-body').click()
		}
	const btn_remove = document.querySelectorAll(S_CLARA + '.panel_remove > i.fa-trash-alt')
	for (let i = 0; i < btn_remove.length; i++)
		btn_remove[i].onclick = function () {
			clara.removePanelToWspace(this.parentNode.nextSibling)
		}
}

function loader() {
	clara.node.style.visibility = 'hidden'
	Ajax.get(window.location + "/view/index.html", {}, function (res) {
		clara.node.innerHTML = res
		window.setTimeout(function () {
			document.getElementById('reload').onclick = () => {
				loader()
			}
			bindInitial()
			clara.steps.info.node = document.getElementById('tab-info')
			clara.steps.goal.node = document.getElementById('tab-goal')
			clara.steps.workspace.node = document.getElementById('tab-workspace')
			clara.node.style.visibility = 'visible'
			insertPannel('module')
			insertPannel('project')
			clara.steps.info.start()
		}, 1)
	})
}

function downloader() {
	download(Subject.generate(), "sujet.html", "text/html");
}

function set_module_info() {
	clara.moduleName = document.querySelector(S_TAB_INFO + 'input[name="module"]').value
	clara.projectName = document.querySelector(S_TAB_INFO + 'input[name="project"]').value
	const infos = document.querySelectorAll('#clara #tab-info form input[name^=":"]')
	for (let i = 0; i < infos.length; i++)
		clara.moduleInfo[infos[i].name] = infos[i].value != '' ? infos[i].value : null
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
	document.querySelector(S_PANNELS + '-module > .panel-heading').innerHTML = clara.moduleName
	document.querySelector(S_PANNELS + '-project > .panel-heading').innerHTML = clara.projectName
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
	const newNode = template.panels[type].cloneNode(true)
	paentNode.appendChild(newNode)
	insertDropZone()
	bind()
}

function panelExist(type) {
	return document.querySelectorAll('#tab-workspace .panel-' + type).length > 0
}

function insertPannelAfter(referenceNode, type) {
	const newNode = template.panels[type].cloneNode(true)
	document.querySelector('#clara #tab-workspace > .tab-body').insertBefore(newNodeEditPannel(), referenceNode)
	document.querySelector('#clara #tab-workspace > .tab-body').insertBefore(newNode, referenceNode)
	document.querySelector('#clara #tab-workspace > .tab-body').insertBefore(newNodeDropZone(), referenceNode)
	bind()
}