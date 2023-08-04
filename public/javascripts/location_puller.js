document.getElementById("location_finder").onclick = function()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function successFunction(position) {
    let location_field = document.getElementById("location_input_box")
    location_field.value = position.coords.latitude + " " + + position.coords.longitude
    console.log(position);
    fetch('/weather_handle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
        .then(response => {
            // Handle the server's response if needed
            console.log('Position data sent successfully');
        })
        .catch(error => {
            console.error('Error sending position data:', error);
        });
}

function errorFunction() {
    console.log("Unable to retrieve your location.");
}
console.log("This worked.")