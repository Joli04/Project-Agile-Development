const dropdown = document.getElementById("myDropdownDiv")
const button = document.getElementById("button")
const transport1 = document.getElementById("transport1");
const transport2 = document.getElementById("transport2");
const transport3 = document.getElementById("transport3");
const transport4 = document.getElementById("transport4");
const transport5 = document.getElementById("transport5");
const transporten = [transport1,transport2,transport3,transport4,transport5];
const transport_popup = document.querySelector('.popup')
const close = document.getElementsByClassName("close")[0];

button.onclick = function() {
    dropdown.style.display = "block";
}

close.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === dropdown){
        modal.style.display = "none";
    }
}
