// Assign the data from `data.js`
var ufoData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Build a function that takes a dataset (an array) and appends the table structure into the html
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
var buttonFilter = d3.select("#filter-btn");
var buttonClean = d3.select("#clean-btn");

// Create event handlers 
buttonFilter.on("click", runEnter);
buttonClean.on("click", runRefresh);


// Filter function
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
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

    // Apply filters for each applicable input to get to a final filtered dataset
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

    // Build condition to catch scenario when nothing is entered as filters and the user clicks on the button
    if (inputDate === "" &&
        inputCity === "" &&
        inputState === "" &&
        inputCountry === "" &&
        inputShape === ""
    ) {
        ufoData = data;
    };

    // Check returned results (for developers)
    console.log(ufoData);

    // Remove any children from the tbody
    tbody.html("");

    // Append filtered data into the table (if applicable)
    appendTable(ufoData);
};


// Function to clean all the filters and return the original dataset
function runRefresh() {
    
    d3.event.preventDefault();

    // Reset the input values for the filters
    d3.select("#datetime").property("value", "");
    d3.select("#city").property("value", "");
    d3.select("#state").property("value", "");
    d3.select("#country").property("value", "");
    d3.select("#shape").property("value", "");

    // Redefine ufoData to the original data
    var ufoData = data;

    console.log(ufoData);
    tbody.html("");
    appendTable(ufoData);
};
