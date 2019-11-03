window.onload = function(e){
    loadBoard();
}
const addBoardBtn = document.querySelector('#add-board');
const container = document.querySelector('.container');
addBoardBtn.addEventListener('click', addNewBoard);

function addNewBoard(event){
    let board = document.createElement('div');
    board.classList = 'board shadow';
    board.innerHTML = `
        <h3 class="board__title" contenteditable="true">New board</h3>
        <div class="input-field shadow">
            <input type="text" placeholder="Type new task..."class="add-task-field">
            <button class="btn btn-add-task">Add</button>
        </div>
        <ul class="tasks__list">
            
        </ul>
        <button class="delete-btn">&times;</button>
    `;
    board.setAttribute('data-target', 'dropzone');
    this.parentElement.insertBefore(board, this);
    saveBoard();
}

window.addEventListener('click', function(event){
    let target = event.target;
    if(target.classList.contains('btn-add-task')){
        let taskInput = target.previousElementSibling;
        
        let taskName = taskInput.value;
        let list = target.closest('.board').querySelector('.tasks__list');
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
        saveBoard();
    }   
});
window.addEventListener('keypress', function(e){
    if ((e.keyCode == 13) && (e.target.classList.contains('add-task-field'))){
        let target = event.target;        
        let taskName = target.value;
        let list = target.closest('.board').querySelector('.tasks__list');
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
    task.innerHTML+=`<button class="delete-btn">&times;</button>`;
    list.appendChild(task);    
    saveBoard();
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
        saveBoard();
    }else if(target.closest('.board') && 
    (task.closest('.board') !== target.closest('.board'))){
        target.closest('.board').querySelector('.tasks__list').appendChild(task);
        task.removeAttribute('data-target');
        saveBoard();
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

function saveBoard(){
    let storage = [];
    let boards = document.querySelectorAll('.board');
    if (boards){
        for (let i = 0; i < boards.length; i++){
            storage.push(boards[i].innerHTML);
        }
    }
    localStorage.clear();
    for(let i = 0; i < storage.length; i++){
        localStorage.setItem(i, storage[i]);
        console.log(storage[i]);
    }
}

function loadBoard(){
    let addBtn = document.querySelector('.btn-add-board');
    
    for (let i = 0; i < localStorage.length; i++){
        let board = document.createElement('div');
        board.classList = 'board shadow';
        board.innerHTML = localStorage.getItem(i);
        board.setAttribute('data-target', 'dropzone');
        console.log(board);
        addBtn.parentElement.insertBefore(board, addBtn);
    }
}
