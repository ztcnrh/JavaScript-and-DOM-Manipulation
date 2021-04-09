// Assign the data from `data.js`
var ufoData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

function appendTable(arr) {
    arr.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.values(sighting).forEach(value => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
}

// Append all data into a table as the default view
appendTable(ufoData);

// ----------------------------------------------
// Create event listeners to find rows that match user input filters.

// Select the button
var button = d3.select("#filter-btn");

// Create event handlers 
button.on("click", runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    // d3.event.preventDefault();
  
    // Get the value property of the `datetime` input element
    var inputDate = d3.select("#datetime").property("value");
    // Get the value property of the `city` input element
    var inputCity = d3.select("#city").property("value");
    // Get the value property of the `state` input element
    var inputState = d3.select("#state").property("value");
    // Get the value property of the `country` input element
    var inputCountry = d3.select("#country").property("value");
    // Get the value property of the `shape` input element
    var inputShape = d3.select("#shape").property("value");

    // console.log(inputDate);
    if (inputDate !== "") {
        ufoData = ufoData.filter(sighting => sighting.datetime === inputDate);
    };
    if (inputCity !== "") {
        ufoData = ufoData.filter(sighting => sighting.city === inputCity);
    };
    if (inputState !== "") {
        ufoData = ufoData.filter(sighting => sighting.state === inputState);
    };
    if (inputCountry !== "") {
        ufoData = ufoData.filter(sighting => sighting.country === inputCountry);
    };
    if (inputShape !== "") {
        ufoData = ufoData.filter(sighting => sighting.shape === inputShape);
    };

    if (inputDate === "" &&
        inputCity === "" &&
        inputState === "" &&
        inputCountry === "" &&
        inputShape === ""
    ) {
        ufoData = data;
    };

    console.log(ufoData);

    tbody.html("");

    appendTable(ufoData);
};

