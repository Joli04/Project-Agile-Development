const animation = document.querySelector('.flip-box .flip-box-inner');
const confirmBtn = document.querySelector('#confirmBtn');


animation.addEventListener('click', function (){
    console.log('clicked!');
    animation.style.transform = "rotateX(180deg)";
})

confirmBtn.addEventListener('click', function (){
    console.log('btn clicked!');
})
