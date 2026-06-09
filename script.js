


let players = [];

async function reqSheet() {
	//const url = "https://docs.google.com/spreadsheets/d//edit?usp=sharing"
	const url = "https://docs.google.com/spreadsheets/d/1Th9xJGFQej2nT1ChUcY4j34eW1LD4L_7O-kOUv8RTBk/gviz/tq?tqx=out:csv&sheet=Sheet1";

	try {
		const response = await fetch(url);
		const csvText = await response.text();
		console.log(csvText);

		const rows = csvText.split("\n").map(row => row.split(","));
		console.log(rows);

		for (const r of rows) {
			players.push(r[0]);
		}
	}
	catch (error) {
		console.log(error);
	}
}

reqSheet();



let player;
let password;
let loggedIn;
let cancelled = false;
do {
	player = prompt("Enter your username:");
} while (player != null && player != "");

player = "\"" + player + "\"";

if (players.indexOf(player) >= 0) {
	loggedIn = rows[players.indexOf(player)][2];

	if (loggedIn != "\"\"") {
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
				if (passwords.indexOf(password) >= 0 && passwords.indexOf(password) == players.indexOf(player)) {
					loggedIn = "t";
					alert("Success!");
				}
			}
		} while (loggedIn == "\"\"" && cancelled == false);
	}
}
else {
	alert("New player created!");
	playerID = players.length;
	do {
		password = prompt("Create your password:");
	} while (password != null && password != "");
	alert("Success!");
}

console.log("we made it here.");







function sendMessage() {
	let newMessage = document.getElementById("message").value;
	let newP = document.createElement("p");
	newP.innerText = newMessage;
	document.getElementById("messages").appendChild(newP);
	//document.getElementById("messages").scrollTo(0, document.)
	document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}


