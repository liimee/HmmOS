//file system
var storage = {
  private: {
    "version.str": "alpha 4"
  },
  appData: {
    tempJS: {
      "commands.str": ``
    }
  },
  stored: {
    "text.str": "true",
    "haha.ra": ["hi", "wow"],
    desktop: {
      "yes.str": "yes"
    }
  },
  "wow.str": "clap clap wow"
};
var node = document.createElement("window");
//the boring variable thingies
const errtxt = document.getElementById("popup-text");
const blur = document.getElementById("darken");
const windowContainer = document.getElementById("windows");
var active = "";
var appcodes = {
  test: [
		"button",
		"Click me",
		"h1",
		"wwwwwwwww",
		"script",
		"document.querySelector('window button').onclick = function(){alert('you got hacked LOL'); document.querySelector('*').innerHTML = 'hi'};"
	],
  fileExplorer: [
		"div",
		"",
		"style",
		`
  fefile{
    display: block;
    font-size: 15px;
    background-color: #333;
  }
  fefolder{
    display: block;
    font-size: 15px;
    background-color: #fa0;
    border-bottom: 1px solid #000;
  }
  `,
		"script",
		`
  var feDirectory = storage
  var feContainer = document.getElementById('0offileExplorer');

feGetFilesaddElements();
$('fefolder').onclick = function(){
  feDirectory = feDirectory[this.innerHTML];
  feGetFilesaddElements();
  feGetFilesaddElements();
}
$('fefile').onclick = function(){
  alert(feDirectory[this.innerHTML]);
  feGetFilesaddElements();
}
  `
	],
  //TEMPJS
  tempJS: [
		"style",
		"tjsconsole{height: 50px; overflow: scroll}",
		"tjsconsole",
		"",
		"form",
		"",
		"script",
		`
var tjs_form = document.getElementById('2oftempJS');
tjs_form.innerHTML = '<input>'
tjs_form.style.display = 'inline'
document.getElementById('1oftempJS').style.overflow = 'none'
document.getElementById('1oftempJS').style.height = '50px'
document.getElementById('4oftempJS').onclick = function(){
	appendNewElement('script', tjs_form.elements[0].value, document.querySelector('head'));
	document.querySelector('tjsconsole').innerHTML += tjs_form.elements[0].value + '<br>';
	storage.appData.tempJS['commands.str'] += tjs_form.elements[0].value + '<br>';
}
`,
		"button",
		"Enter"
	]
};
var windowsOpened = 0;
var xOffset, yOffset;
//function defining
function toggleblur() {
  $(".darken").toggle();
}

function togglePopup() {
  toggleblur();
  $(".popup").toggle();
}

function openWindow(appID, custom) {
  //get the code and stuff
  var classCount = 0;
  var windowname;
  var windowcode;
  if (!custom) {
    windowcode = appcodes[appID];
  } else {
    windowcode = appID;
    windowname = "";
  }
  var windowname = appID;
  var node = document.createElement("window"); //make a node (for the app)
  //decode the windowcode
  //title bar (named taskbar)
  const position = { x: 0, y: 0 };

  interact(node).draggable({
    allowFrom: "taskbar",
    modifiers: [],
    listeners: {
      start(event) {},
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
    }
  })
  
  interact(node).resizable({
    edges: {
      top: false,
      left: true,
      bottom: true,
      right: true
    }
  }).on('resizemove', event => {
    let { x, y } = event.target.dataset;

    Object.assign(event.target.style, {
      width: `${event.rect.width}px`,
      height: `${event.rect.height}px`
    })

    Object.assign(event.target.dataset, { x, y })
  });

  var taskbar;
  if (!custom) {
    taskbar = document.createTextNode("" + windowname + "");
  } else {
    taskbar = document.createTextNode("");
  }
  var taskbardiv = document.createElement("taskbar");
  taskbardiv.id = "windowId" + windowsOpened + "header";
  taskbardiv.appendChild(taskbar);
  taskbardiv.id = "windowTitle" + windowsOpened;
  node.appendChild(taskbardiv);
  //close
  //dont mind recycling of vars
  taskbar = document.createTextNode("X");
  taskbardiv = document.createElement("close");
  taskbardiv.appendChild(taskbar);
  taskbardiv.onclick = function() {
    windowsOpened--;
    this.parentNode.remove();
  };
  taskbardiv.id = "closeButton" + windowsOpened;

  node.appendChild(taskbardiv);
  //aaa
  var line;
  for (i = 0; i < windowcode.length; i++) {
    line = windowcode[i];
    var textnode = document.createTextNode(line);
    if (i % 2 == 0) {
      var tag = document.createElement(line);
      tag.id = classCount + "of" + appID;
      classCount += 1;
    } else {
      tag.appendChild(textnode);
      node.appendChild(tag);
    } //-if
  } //-for
  windowsOpened++;
  node.id = "windowId" + windowsOpened;
  document.getElementById("windows").appendChild(node); // add to window container
  //add icon to bar
  addToBar(appID, "#fff", appID.charAt(0));
  elmnt = document.getElementById(active);
} //-function
function appendNewElement(ae_name, ae_content, ae_element) {
  var ae_node = newElement(ae_name, ae_content);
  ae_element.appendChild(ae_node);
}

function newElement(ne_tagname, ne_content) {
  var ne_textnode = document.createTextNode(ne_content);
  var ne_node = document.createElement(ne_tagname);
  ne_node.appendChild(ne_textnode);
  return ne_node;
}
$(document).on("click", "taskbar", function() {
  active = this.id;
});

function closewindo() {
  alert("no");
}

function feGetFilesaddElements() {
  feContainer.innerHTML = "";
  var fefile = "";
  for (fefile in feDirectory) {
    var fecurrentfile = feDirectory[fefile];
    //check if folder or file

    if (typeof fecurrentfile == "string") {
      appendNewElement("fefile", fefile, feContainer);
    } else {
      appendNewElement("fefolder", fefile, feContainer);
    }
  }
}

function addToBar(atb_name, atb_color, atb_iconhtm) {
  document.getElementById("bar").innerHTML +=
    "<baritem>" + atb_iconhtm + "</baritem>";
}
$(document).ready(function() {
  openWindow(
		[
			"h1",
			"Hello",
			"p",
			`This is the actual worst OS.
			This is like a decillion times worse than Nothing (the OS).`,
			"script",
			"document.querySelector('taskbar').innerHTML = 'Welcome'"
		],
    true
  );
});
$('body').bind('contextmenu', function() { //i think it removes the right click menu
  return false;
});

if (document.referrer.startsWith('https://liimee.github.io') || document.referrer.startsWith('https://useless123') ) {
	alert("you're already in the best OS, and no HmmOS is not better")
	window.history.back();
}
