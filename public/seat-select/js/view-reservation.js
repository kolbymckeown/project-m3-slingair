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
		const contentDiv = document.getElementById("content");
		contentDiv.innerText = data.email;
		// do this for each part of the data
	});
