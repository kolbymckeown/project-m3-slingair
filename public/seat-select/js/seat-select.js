const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";

const renderSeats = (seatsInfo) => {
	document.querySelector(".form-container").style.display = "block";

	const alpha = ["A", "B", "C", "D", "E", "F"];
	for (let r = 1; r < 11; r++) {
		const row = document.createElement("ol");
		row.classList.add("row");
		row.classList.add("fuselage");
		seatsDiv.appendChild(row);
		for (let s = 1; s < 7; s++) {
			const seatNumber = `${r}${alpha[s - 1]}`;
			const seat = document.createElement("li");

			// Two types of seats to render
			const seatOccupied = `<label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label>`;
			const seatAvailable = `<label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label>`;
			// map function to create <li> that adds specific class
			// TODO: render the seat availability based on the data...
			seat.innerHTML = seatAvailable;
			row.appendChild(seat);
		}
	}

	let seatMap = document.forms["seats"].elements["seat"];
	seatMap.forEach((seat) => {
		seat.onclick = () => {
			selection = seat.value;
			seatMap.forEach((x) => {
				if (x.value !== seat.value) {
					document.getElementById(x.value).classList.remove("selected");
				}
			});
			document.getElementById(seat.value).classList.add("selected");
			document.getElementById("seat-number").innerText = `(${selection})`;
			confirmButton.disabled = false;
		};
	});
};

const toggleFormContent = (event) => {
	const flightNumber = flightInput.value;
	console.log("toggleFormContent: ", flightNumber);
	fetch(`/flights/${flightNumber}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			renderSeats(data);
		});
	// TODO: contact the server to get the seating availability
	//      - only contact the server if the flight number is this format 'SA###'.
	//      - Do I need to create an error message if the number is not valid?

	// TODO: Pass the response data to renderSeats to create the appropriate seat-type.
};

const handleConfirmSeat = (event) => {
	event.preventDefault(); // prevents page reload

	// TODO: everything in here!
	const body = JSON.stringify({
		givenName: document.getElementById("givenName").value,
		surname: document.getElementById("surname").value,
		email: document.getElementById("email").value,
		seat: document.getElementsByClassName("selected")[0].innerText,
		flight: document.getElementById("flight").value,
	});
	// console.log(document.getElementsByClassName('selected')[0])
	console.log(body);
	fetch("/reservation", {
		method: "POST",
		body: body,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
};

flightInput.addEventListener("blur", toggleFormContent);
