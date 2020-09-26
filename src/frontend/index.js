function redLight(e) {
    e.preventDefault();
    let redLed = document.getElementById('redLEDInput');
    let redLamp = document.getElementById('redLampInput');
    let url = `/sethexcolor?lamp=${redLamp.value || 0}&led=${redLed.value || 0}&hex=ff0000`
    console.log(url);
    fetch(url).then((response) => {
        console.log(response);
    });
}

function resetLight(e) {
    e.preventDefault();
    let url = `/reset`
    console.log(url);
    fetch(url).then((response) => {
        console.log(response);
    });
}

