//dom
const toggle = document.getElementById('toggle');
const toggleBtn = document.getElementById('toggleBtn');

function hide(){
    toggle.classList.remove('setting');
    toggle.classList.add('hide');
}

function show() {
    toggle.classList.remove('hide');
    toggle.classList.add('setting');
}

toggleBtn.addEventListener('click', function() {
    if(toggle.classList.contains('hide')){
        show();
    }else {
        hide();
    }
    
});