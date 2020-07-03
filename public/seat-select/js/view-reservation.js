// Grab ID from url
// Fetch reservation /reservation/:id
// populate DOM with html elements with new data
const str = window.location.search;
const id = str.split("=")[1];
console.log(id);

fetch(`/reservation/${id}`)
	.then((data) => data.json())
	.then((data) => {
		console.log(data);
		const flightNumberDiv = document.getElementById("flightNumber");
		const seatNumberDiv = document.getElementById("seatNumber");
		const givenNameDiv = document.getElementById("givenName");
		// const surnameDiv = document.getElementById("surname");
		const emailDiv = document.getElementById("email");
		flightNumberDiv.innerText = data.flight.toUpperCase();
		seatNumberDiv.innerText = data.seat;
		givenNameDiv.innerText = `${data.givenName + " " + data.surname}`;
		// surnameDiv.innerText = data.surname;
		emailDiv.innerText = data.email;
		// do this for each part of the data
	});
