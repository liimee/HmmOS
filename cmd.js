hmm.$$ = (cm, c) => {//run more than 1 command
	return new Promise(res => {
		let i = 0;
		(function run() {
			hmm.$((cm.split`\n`[i] || "#"), c).then(() => {
				if (cm.length == i) {res();return}
				i++
				run()
			})
		})()
	})
}
hmm.$ = (cm, c) => {
	let l = hmm.$.token(cm)
	if (l[0] == "") return new Promise(r => r());
	if (l[0] in hmm.storage.cmd) {
		let fn = hmm.storage.cmd[l[0]]
			, e = l.slice(1)
		return eval(fn.slice(fn.indexOf("{") + 1, -1)) || new Promise(r => r())
	} else {
		c.err("Command not found")
		return new Promise(res => res())
	}
}
hmm.$.token = (e) => {
	let l = [""], string = !1
	e.split("").forEach((e, n) => {
		if (string) {
			if (e != '"' || e[n - 1] == "\\") { l[l.length - 1] += e } else {
				string = !1
			}
		} else {
			if (e == " ") {
				l.push("")
			} else if (e == '"') {
				string = !0
			} else {
				l[l.length - 1] += e
			}
		}
	})
	return l
}
hmm.pathToPath = (p, cwd) => {
	if (p == '/') return p
	if (p.startsWith('~')) return '/user' + p.slice(1)
	if (!p.startsWith('/')) return (cwd == '/' ? cwd : cwd + '/') + p
	return p
}
hmm.storage.cmd = {
	help(c) {//todo fix this
		`Built-in commands:
cd: change current directory
clear: clears screen
echo: displays text
err: displays an error
ls: lists folders and files in the current directory
open: opens an file or path
ptbye: opens a terminal window
wait: wait a certain amount of milliseconds
rm: delete a file or folder
`.split('\n').slice(0, -1).forEach(c.echo)
	},
	echo() {
		c.echo(e.join(" "))
			, 0
	},
	err() {
		c.err(e.join(" "))
			, 0
	},
	open() {
		let fname = hmm.pathToPath(e.join` `, (c ? c.eval('cwd') : '/')), h = true
		Object.keys(hmm.storage['.pr'].handlers).forEach(e => {
			if (fname.endsWith(e)) { hmm.openApp(hmm.storage['.pr'].handlers[e], "$open " + fname); h = false }
		})
		if (h) hmm.openApp('textpad.hmm', "$open " + fname)
	},
	"#"() { },
	ptbye() {//like PTY but much worse
		new hmm.App("/.shmm/app.hmm").open("")
	},
	wait() {
		new Promise(r => setTimeout(r, Number(e[0])))
	},
	cd() {
		c.eval('cwd=atob("' + btoa(hmm.pathToPath(e.join``, c.eval('cwd'))) + '")')
			, 0
	},
	ls() {
		var f = hmm.pathToJs(hmm.pathToPath(e.join``, c.eval('cwd')))
		Object.keys(f).sort().forEach(c.echo)
			, 0
	},
	clear() { c.eval('lines=[];ty=-1;yOffset=0'), 0 },
	$() {
		hmm.$$(hmm.pathToJs(hmm.pathToPath(e.join``, c.eval('cwd'))), c)
	},
	rm(){
		eval("delete "+hmm.pathToDot(hmm.pathToPath(e.join``, c.eval('cwd'))))
		,0
	}
}
for (const cmd in hmm.storage.cmd) {
	hmm.storage.cmd[cmd] = String(hmm.storage.cmd[cmd])
}
// window.onmessage = (ev) => {
// 	if ('_AppName' in ev.source) {
// 		console.log(ev.source)
// 	}
// }