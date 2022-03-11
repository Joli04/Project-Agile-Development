const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0];
const btn = document.getElementById("myBtn");
const prize1 = document.getElementById('prize1');
const prize2 = document.getElementById('prize2');
const prize3 = document.getElementById('prize3');
const body = document.body;
const prize_popup = document.querySelector('.popup');
const prizes = [prize1, prize2, prize3];
function timeout() {
    setTimeout(function () {
        prize_popup.style.display = "block";
    }, 300);
}

// When the user clicks on <span> (x), close the modal
close.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";

    }
}

    btn.addEventListener('click', function (){
        modal.style.display = "block";
    });




prize1.onmouseover = function() {
    body.className = 'hoveredp1';
    timeout();
}

prize2.onmouseover = function (){
    body.className = 'hoveredp2';
    timeout();
}

prize3.onmouseover = function (){
    body.className = 'hoveredp3';
    timeout();
}

for (let i = 0; i < prizes.length; i++) {
    prizes[i].onmouseout = function(){
        body.className = '';
        prize_popup.style.display = "none";
    }
}
