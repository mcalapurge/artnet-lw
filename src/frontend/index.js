document.getElementsByTagName('body')[0].addEventListener('auxclick', (ev) => {
    ev.preventDefault();
});


Array.from(document.getElementsByClassName('led')).forEach((element) => {
    const hex = element.getAttribute('data-hex');
    const lamp = element.getAttribute('data-lamp');
    const led = element.getAttribute('data-led');
    let url = `/sethexcolor?lamp=${lamp}&led=${led}&hex=${hex}`;
    let outUrl = `/sethexcolor?lamp=${lamp}&led=${led}&hex=000000`;
    let white = `/sethexcolor?lamp=${lamp}&led=${led}&hex=ffffff`;
    
    element.addEventListener('click', () => {
        element.style.backgroundColor = '#' + hex;
        fetch(url).then((response) => {
            console.log(response);
        });
    });
    element.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();

        element.style.backgroundColor = '#' + '000000';
        fetch(outUrl).then((response) => {
            console.log(response);
        });

        return false;
    }, false);

    element.addEventListener('auxclick', (ev) => {
        ev.preventDefault();

        element.style.backgroundColor = '#' + 'ffffff';
        fetch(white).then((response) => {
            console.log(response);
        });

        return false;
    }, false);

})

function resetLampColors() {
    Array.from(document.getElementsByClassName('led')).forEach((element) => {
        element.style.backgroundColor = '#000000';
    });
}

const reset = document.getElementById('reset');

reset.addEventListener('click', () => {
    fetch('/reset').then((response) => {
        console.log(response);
    });
    resetLampColors();
})