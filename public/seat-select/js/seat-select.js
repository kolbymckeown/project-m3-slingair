const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";

const renderSeats = (seatsInfo) => {
	seatsDiv.innerHTML = "";
	document.querySelector(".form-container").style.display = "block";
	console.log(seatsInfo)
	seatsInfo.forEach((rowSeats) => {
		const row = document.createElement("ol");
		row.classList.add("row");
		seatsDiv.appendChild(row);
		console.log(rowSeats)
		rowSeats.forEach((seat) => {
			const seatNumber = seat.id;
			const seatElem = document.createElement("li");

			const seatOccupied = `<label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label>`;
			const seatAvailable = `<label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label>`;

			if (seat.isAvailable === false) {
				seatElem.innerHTML = seatOccupied;
			} else {
				seatElem.innerHTML = seatAvailable;
			}

			row.appendChild(seatElem);
		});
	});

	let seatMap = document.forms["seats"].elements["seat"];
	seatMap.forEach((seat) => {
		// console.log(seat)
		seat.onclick = () => {
			selection = seat.value;
			seatMap.forEach((x) => {
				// console.log(x);
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
	const flightNumber = flightInput.value.toUpperCase();
	console.log("toggleFormContent: ", flightNumber);
	fetch(`/flights/${flightNumber}`)
		.then((res) => res.json())
		.then((data) => {
			//console.log(data);
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
	fetch("/reservation", {
		method: "POST",
		body: body,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((data) => data.json())
		.then((data) => {
			window.location.replace(`/seat-select/view-reservation.html?id=${data.id}`);
		});
};

flightInput.addEventListener("blur", toggleFormContent);
