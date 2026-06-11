
//                  ID, name, pw, log, msg
localState = {state: ["", "", "", "", ""]}

let players = [];
let passwords = [];
let rows;

let playerID;
let player;
let password;
let loggedIn;
//let newMessage;
//let lastMessage = "";
let cancelled = false;

async function reqSheet() {
	//const url = "https://docs.google.com/spreadsheets/d//edit?usp=sharing"
	const url = "https://docs.google.com/spreadsheets/d/1Th9xJGFQej2nT1ChUcY4j34eW1LD4L_7O-kOUv8RTBk/gviz/tq?tqx=out:csv&sheet=Sheet1";

	try {
		const response = await fetch(url);
		const csvText = await response.text();
		console.log(csvText);

		rows = csvText.split("\n").map(row => row.split(","));
		console.log(rows);

		for (let r of rows) {
			if (r[1] != "\"\"") {
				players.push(r[1]);
			}
		}



		do {
			player = prompt("Enter your username:");
		} while (player == null || player == "");

		player = "\"" + player + "\"";

		console.log(player);
		console.log(players[players.indexOf(player)]);

		if (players.indexOf(player) >= 0) {
			loggedIn = rows[players.indexOf(player)][3];

			if (loggedIn != "\"\"" && Date.now() - parseInt(loggedIn) < 11000) {
				alert("Sorry, you are already logged in.");
			}
			else {
				do {
					password = prompt("Enter your password:");
					if (password == null) {
						cancelled = true;
					}
					else {
						password = "\"" + password + "\"";
						//if (passwords.indexOf(password) >= 0 && passwords.indexOf(password) == players.indexOf(player)) {
						if (password == rows[players.indexOf(player)][2]) {
							loggedIn = Date.now();
							alert("Success!");
							playerID = players.indexOf(player) + 1;
						}
						else {
							alert("Incorrect password.");
						}
					}
				} while (loggedIn == "\"\"" && cancelled == false);
			}
		}
		else {
			alert("New player created!");
			playerID = players.length + 1;
			do {
				password = prompt("Create your password:");
			} while (password == null || password == "");
			password = "\"" + password + "\"";
			alert("Success!");
			//localState.state[0] = playerID;
			loggedIn = Date.now();
		}

		console.log("we made it here.");
		localState.state[0] = playerID;
		localState.state[1] = player.substring(1, player.length - 1);
		localState.state[2] = password.substring(1, password.length - 1);
		localState.state[3] = loggedIn;
		localState.state[4] = "(" + player.substring(1, player.length - 1) + " has joined!)";
		//lastMessage = "(" + player + " has joined!)";
	}
	catch (error) {
		console.log(error);
	}
}

console.log("starting async");
reqSheet();
console.log("finished async");

let pushIntervalID;

setTimeout(() => {
	pushIntervalID = setInterval(pushState, 10000);
}, 20000);

let pullIntervalID;

setTimeout(() => {
	pullIntervalID = setInterval(pullState, 10000);
}, 25000);

async function pushState() {
	const url = "https://script.google.com/macros/s/AKfycbw6rsxZHPGirGy6Bm5MOwLzIg8MJ-_dXZN6qthp-MjbXC90E10LH-VoqXHWmoGtUY_n/exec";
	localState.state[3] = Date.now();
	// if (localState.state[4] == lastMessage) {
	// 	localState.state[4] = "";
	// }

	// if (document.getElementById("send").disabled) {
	// 	document.getElementById("send").disabled = false;
	// }

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain;charset=utf-8',
				//'Content-Type': 'application/json',
			},
			body: JSON.stringify(localState),
		});
		const data = await response.json();
		console.log(data);
		console.log(Date.now());
	}
	catch (error) {
		console.log(error);
	}
}

async function pullState() {
	const url = "https://docs.google.com/spreadsheets/d/1Th9xJGFQej2nT1ChUcY4j34eW1LD4L_7O-kOUv8RTBk/gviz/tq?tqx=out:csv&sheet=Sheet1";

	try {
		const response = await fetch(url);
		const csvText = await response.text();
		console.log(csvText);

		rows = csvText.split("\n").map(row => row.split(","));
		console.log(rows);

		for (let m of rows.slice(1)) {
			let newMes = m[4];
			if (newMes != "\"\"") {
				//console.log(m[1] + " versus " + localState[1]);
				if (m[1] == "\"" + localState.state[1] + "\"") {
					//lastMessage = localState.state[4];
					localState.state[4] = "";
				}
				let newP = document.createElement("p");
				newP.innerText = newMes.substring(1, newMes.length - 1);
				document.getElementById("messages").appendChild(newP);
				//document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
			}
		}
		document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
		if (document.getElementById("send").disabled) {
			document.getElementById("send").disabled = false;
		}
		console.log(Date.now());
	}
	catch (error) {
		console.log(error);
	}
}

function sendMessage() {
	//newMessage = document.getElementById("message").value;
	//lastMessage = document.getElementById("message").value;
	localState.state[4] = document.getElementById("message").value;
	//let newP = document.createElement("p");
	//newP.innerText = newMessage;
	//newP.innerText = localState.state[4];
	//document.getElementById("messages").appendChild(newP);
	//document.getElementById("messages").scrollTo(0, document.)
	//document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
	document.getElementById("message").value = "";
	document.getElementById("send").disabled = true;
}
