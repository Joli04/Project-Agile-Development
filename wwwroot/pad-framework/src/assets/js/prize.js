const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0];
const btn = document.getElementById("myBtn");
const prize1 = document.getElementById('prize1');
const prize2 = document.getElementById('prize2');
const prize3 = document.getElementById('prize3')
const body = document.body;
const prize_popup = document.querySelector('.popup');
const prizes = [prize1, prize2, prize3];
var img = document.createElement("img");
var src = document.getElementById("popup-prize");


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
    img.src = "https://pbs.twimg.com/profile_images/1284476346/vakantie_reasonably_small.gif";
    src.appendChild(img);
}

prize2.onmouseover = function (){
    body.className = 'hoveredp2';
    timeout();
    img.src = "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/vslgdggkdt7kbg1ycqab";
    src.appendChild(img);
}

prize3.onmouseover = function (){
    body.className = 'hoveredp3';
    timeout();
    img.src = "https://pbs.twimg.com/profile_images/51457981/koffie_3__reasonably_small.gif";
    src.appendChild(img);
}

for (let i = 0; i < prizes.length; i++) {
    prizes[i].onmouseout = function(){
        body.className = '';
        prize_popup.style.display = "none";
    }
}