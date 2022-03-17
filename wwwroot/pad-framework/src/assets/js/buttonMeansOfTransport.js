const content = document.getElementById("myContentDiv")
const button = document.getElementById("transportButton")
const close = document.getElementsByClassName("closeWindow")[0];

button.onclick = function() {
    content.style.display = "block";
}

close.onclick = function () {
    content.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === content){
        content.style.display = "none";
    }
}
