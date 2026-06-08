
async function reqSheet() {
	//const url = "https://docs.google.com/spreadsheets/d//edit?usp=sharing"
	const url = "https://docs.google.com/spreadsheets/d/1Th9xJGFQej2nT1ChUcY4j34eW1LD4L_7O-kOUv8RTBk/gviz/tq?tqx=out:csv&sheet=Sheet1";

	try {
		const response = await fetch(url);
		const csvText = await response.text();
		console.log(csvText);

		//const rows = csvText.split("\n").map(row => row.split(","));
		//console.log(rows);
	}
	catch (error) {
		console.log(error);
	}
}

function sendMessage() {
	let newMessage = document.getElementById("message").value;
	let newP = document.createElement("p");
	newP.innerText = newMessage;
	document.getElementById("messages").appendChild(newP);
	//document.getElementById("messages").scrollTo(0, document.)
	document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

reqSheet();
