const body=document.querySelector('body')
const buttons=document.querySelectorAll('.button')
const resetButton = document.getElementById('reset');
// const defaultBgColor = window.getComputedStyle(body).backgroundColor;
const defaultBgColor=body.style.backgroundColor;

buttons.forEach(function(button){
    button.addEventListener('click', function(e){
        body.style.backgroundColor=e.target.id;
    });
});

resetButton.addEventListener('click', function() {
    body.style.backgroundColor = defaultBgColor;
});