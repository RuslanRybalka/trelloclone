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
    `;
    board.setAttribute('data-target', 'dropzone');
    this.parentElement.insertBefore(board, this);

    console.log('add new board')
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
    list.appendChild(task);
}

window.addEventListener('dragstart', onDragstart);
window.addEventListener('dragover', onDragover);
window.addEventListener('drop', onDrop);
window.addEventListener('dragend', onDragend);

function onDragstart(event){
    event.preventDefault;
    let target = event.target;
    target.setAttribute('data-target', 'drag');
    target.classList.add('draged');
    let data = target.getAttribute('data-target');
    event.dataTransfer.setData('text', data);
    console.log('dragStart');
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
    let target = event.target.closest('.board');

    let task = document.querySelector('[data-target="drag"]');

    if(target.getAttribute('data-target') == 'dropzone' && 
    (task.closest('.board') !== target)){
        console.log('drop');        
        target.querySelector('.tasks__list').appendChild(task);
        task.removeAttribute('data-target');
    }else if(target.getAttribute('data-target') == 'trash'){
        console.log('trash')
        task.remove();
    }
    else{
        return false;
    }
}