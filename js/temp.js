let card = document.querySelector('.card');
let dashboard = document.querySelector('.dashboard');

function onDragStart(event){
    event.target.setAttribute('data-drag', 'drag');
    event.dataTransfer.setData('text/plain', event.target.dataset.drag);
    event.dataTransfer.effectAllowed='move';
    console.log(event.dataTransfer);
    this.classList.add('draggable');
    console.log('start dragging');
}

function onDragOver(event){
    event.preventDefault();
    console.log('dragover');
}


function onDragEnd(event){
    event.preventDefault();
    console.log('drag end');
    this.classList.remove('draggable');
    return true;
}

function onDragEnter(event){
    event.preventDefault();
    event.target.classList.add('dashed-border');
    return true;
}
function onDragLeave(event){
    event.target.classList.remove('dashed-border');
}

function onDrop(event){
    if(event.preventDefault) event.preventDefault();
    if(event.stopPropagation) event.stopPropagation();
    let data = document.querySelector('[data-drag="drag"]');
    let dropzone = event.target;
    console.log(event.target);
    dropzone.classList.remove('dashed-border');
    dropzone.appendChild(data);

    console.log('drop');
    event
    .dataTransfer
    .clearData();
}

card.addEventListener('dragstart', onDragStart);
card.addEventListener('dragend', onDragEnd);
dashboard.addEventListener('dragenter', onDragEnter);
dashboard.addEventListener('dragover', onDragOver);
dashboard.addEventListener('dragleave', onDragLeave);
dashboard.addEventListener('drop', onDrop);



<div class="dashboard shadow"></div>
   <div class="card shadow" draggable="true">
       <h3 class="card__title">Trello clone? </h3>
       <p class="card__test">This is some text about somve things</p>
   </div>