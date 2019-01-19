// create reference to table body
var tbody = d3.select("tbody");

// Build our initial HTML table from the "data.js" file
data.forEach(function(ufoReport) {
    var newrow = tbody.append("tr");
    newrow.append("td").text(ufoReport.datetime)
    newrow.append("td").text(ufoReport.city)
    newrow.append("td").text(ufoReport.state)
    newrow.append("td").text(ufoReport.country)
    newrow.append("td").text(ufoReport.shape)
    newrow.append("td").text(ufoReport.durationMinutes)
    newrow.append("td").text(ufoReport.comments)
});

// Define variables for the "Filter Table" and "Clear Filters" buttons
var filter = d3.select("#filter-btn");
var clearFilters = d3.select("#clearFilters");

// Set up event handling for clicking "Filter Table" button
filter.on("click", function() {

    // Prevent page from refreshing
    d3.event.preventDefault();

    // Select input element get the raw HTML node
    var inputElementDate = d3.select("#datetime")
    var inputElementCity = d3.select("#city")
    var inputElementState = d3.select("#state")
    var inputElementCountry = d3.select("#country")
    var inputElementShape = d3.select("#shape")

    // Get the value property of the input element
    var inputValueDate = inputElementDate.property("value");
    var inputValueCity = inputElementCity.property("value");
    var inputValueState = inputElementState.property("value");
    var inputValueCountry = inputElementCountry.property("value");
    var inputValueShape = inputElementShape.property("value");

    // Calculate filtered data for each filter user input
    var dateFilter = data.filter(data => data.datetime === inputValueDate)     
    var cityFilter = data.filter(data => data.city === inputValueCity)
    var stateFilter = data.filter(data => data.state === inputValueState) 
    var countryFilter = data.filter(data => data.country === inputValueCountry) 
    var shapeFilter = data.filter(data => data.shape === inputValueShape)      

    // create array of "filter" objects
    arrays = [dateFilter, cityFilter, stateFilter, countryFilter, shapeFilter]

    // Remove objects from the arrays variable that are empty
    var interimFiltered = arrays.filter(value => Object.keys(value).length !== 0);

    // Intersect array to determine rows that are in common across all initial arrays
    var finalFiltered = interimFiltered.shift().reduce(function(res, v) {
        if (res.indexOf(v) === -1 && interimFiltered.every(function(a) {
            return a.indexOf(v) !== -1;
        })) res.push(v);
        return res;
    }, []);
    
    // Clear initial table
    d3.select('tbody').html("");

    // Create filtered table
    finalFiltered.forEach(function(filtered) {
    var newrow = tbody.append("tr");
    newrow.append("td").text(filtered.datetime)
    newrow.append("td").text(filtered.city)
    newrow.append("td").text(filtered.state)
    newrow.append("td").text(filtered.country)
    newrow.append("td").text(filtered.shape)
    newrow.append("td").text(filtered.durationMinutes)
    newrow.append("td").text(filtered.comments)
    });
});

// Set up event handling for "Clear Filters" button
clearFilters.on("click", function() {

    // Prevent page from refreshing
    d3.event.preventDefault();

    // Clear filtered table
    d3.select('tbody').html("");

    // Create default table
    data.forEach(function(ufoReport) {
        var newrow = tbody.append("tr");
        newrow.append("td").text(ufoReport.datetime)
        newrow.append("td").text(ufoReport.city)
        newrow.append("td").text(ufoReport.state)
        newrow.append("td").text(ufoReport.country)
        newrow.append("td").text(ufoReport.shape)
        newrow.append("td").text(ufoReport.durationMinutes)
        newrow.append("td").text(ufoReport.comments)
    });

    // Reset form values upon filter clear
    document.getElementById('datetime').value = ''
    document.getElementById('city').value = ''
    document.getElementById('state').value = ''
    document.getElementById('country').value = ''
    document.getElementById('shape').value = ''
});