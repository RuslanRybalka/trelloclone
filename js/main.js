window.onload = function(e){
    loadcard();
}
const addcardBtn = document.querySelector('#add-card');
const container = document.querySelector('.container');
addcardBtn.addEventListener('click', addNewcard);

function addNewcard(event){
    let card = document.createElement('div');
    card.classList = 'card shadow';
    card.innerHTML = `
        <h3 class="card__title" contenteditable="true">New card</h3>
        <div class="input-field shadow">
            <input type="text" placeholder="Type new task..."class="add-task-field">
            <button class="btn btn-add-task">Add</button>
        </div>
        <ul class="tasks__list">
            
        </ul>
        <button class="delete-btn">&times;</button>
    `;
    card.setAttribute('data-target', 'dropzone');
    this.parentElement.insertBefore(card, this);
    savecard();
}

window.addEventListener('click', function(event){
    let target = event.target;
    if(target.classList.contains('btn-add-task')){
        let taskInput = target.previousElementSibling;
        
        let taskName = taskInput.value;
        let list = target.closest('.card').querySelector('.tasks__list');
        if(taskName.trim().length > 0){
            addNewTask(taskName, list);
            taskInput.value = '';
        }else{
            taskInput.value = '';
            taskInput.focus();
            return false;
        }        
    }else if(target.classList.contains('delete-btn')){
        target.parentElement.remove();
        savecard();
    }else if(target.classList.contains('complete-btn')){
        target.parentElement.classList.toggle('completed');
    }
});
window.addEventListener('keypress', function(e){
    if ((e.keyCode == 13) && (e.target.classList.contains('add-task-field'))){
        let target = event.target;        
        let taskName = target.value;
        let list = target.closest('.card').querySelector('.tasks__list');
        if(taskName.trim().length > 0){
            addNewTask(taskName, list);
            target.value = '';
        }else{
            target.value = '';
            target.focus();
            return false;
        }
    }
});

function addNewTask(name, list){
    let task = document.createElement('li');
    task.classList = 'tasks__item shadow';
    task.setAttribute('draggable', 'true');
    task.innerHTML = name;
    task.innerHTML+=`<button class="delete-btn">&times;</button>
                     <button class="complete-btn">&#10004;</button>
                    `;
    list.appendChild(task);    
    savecard();
}

window.addEventListener('dragstart', onDragstart);
window.addEventListener('dragover', onDragover);
window.addEventListener('drop', onDrop);
window.addEventListener('dragend', onDragend);

function onDragstart(event){
    let target = event.target;
    if(!target.classList.contains('tasks__item')){
        return;
    }
    target.setAttribute('data-target', 'drag');
    target.classList.add('draged');
    let data = target.getAttribute('data-target');
    event.dataTransfer.setData('text', data);
}
function onDragend(event){
    event.target.classList.remove('draged');
    savecard();
}

function onDragover(event){
    if ( event.preventDefault) event.preventDefault();
    //if ( event.stopPropagation ) event.stopPropagation();
}
function onDrop(event){
    event.preventDefault();
    let target = event.target;

    let task = document.querySelector('[data-target="drag"]');
    if(target.closest('.trash')){
        target.closest('.trash').classList.remove('trash-hover');
        task.remove();
    }else if(target.closest('.card') && 
    (task.closest('.card') !== target.closest('.card'))){
        target.closest('.card').querySelector('.tasks__list').appendChild(task);
        task.removeAttribute('data-target');
    }else {
        return;
    }
}


window.addEventListener('dragenter', onDragenter);
window.addEventListener('dragleave', onDragleave);

function onDragenter(event){
    event.preventDefault();
    if(event.target == document.querySelector('.trash i')){
        document.querySelector('.trash').classList.add('trash-hover');
    }
}

function onDragleave(event){
    event.preventDefault();
   if(event.target == document.querySelector('.trash i')){
        document.querySelector('.trash').classList.remove('trash-hover');
   }
}

function savecard(){
    let storage = [];
    let cards = document.querySelectorAll('.card');
    if (cards){
        for (let i = 0; i < cards.length; i++){
            storage.push(cards[i].innerHTML);
        }
    }
    localStorage.clear();
    for(let i = 0; i < storage.length; i++){
        localStorage.setItem(i, storage[i]);
    }
}

function loadcard(){
    let addBtn = document.querySelector('.btn-add-card');
    
    for (let i = 0; i < localStorage.length; i++){
        let card = document.createElement('div');
        card.classList = 'card shadow';
        card.innerHTML = localStorage.getItem(i);
        card.setAttribute('data-target', 'dropzone');
        addBtn.parentElement.insertBefore(card, addBtn);
    }
}
