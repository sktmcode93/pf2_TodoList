// navigation
let tdnavPage = 0;
const tdnavList = [
    {"desc" : "환영합니다. 아래 추가 버튼으로 할 일을 추가해보세요!"},
    {"desc" : "카테고리와 할 일을 작성 후 추가를 눌러주세요."},
    {"desc" : "정렬을 하기 위해서는 오른쪽에 카테고리나 할 일을 눌러주세요."},
    {"desc" : "수정을 하려면 수정할 대상을 더블클릭 해주세요."},
    {"desc" : "수정이 완료되면 엔터를 취소하려면 ESC키를 눌러주세요."},
    {"desc" : "네비게이션 창을 닫고 싶으면 왼쪽에 X버튼을 눌러주세요."}
];
const tdChangeDesc = (page) => {
    const desc = document.querySelector(".tl-nav-description");
    desc.innerText = tdnavList[page].desc;
}
const tdnavChangePage = (e) => {
    if(e.target.className === "tl-nav-left"){
        if(tdnavPage === 0) return;
        else tdnavPage--;
    }else{
        if(tdnavPage === 5) return;
        else tdnavPage++;
    }
    tdChangeDesc(tdnavPage);
}
const tdnavClose = () => {
    const target = document.querySelector(".tl-nav-box");
    target.classList.remove("tl-nav-load");
    setTimeout(() => {
        target.style.display = "none";
    }, 500);
}
// 로드 이벤트
window.addEventListener("load", () => {
    document.querySelector(".tl-nav-box").classList.add("tl-nav-load");
});

// add Event
let todoList = [];
let tdId = 0;
window.addEventListener("keydown", (e) => {
    if(document.querySelector(".tl-btn-new-active") && !tdwhileEditing){
        if(e.keyCode === 13) tdAddClickHandler();
        if(e.keyCode === 27) tdAddBoxBlur();
    }else if(document.querySelector(".tl-while-edit")){
        if(e.keyCode === 13) tdEditCompletion();
        if(e.keyCode === 27) tdEditCancelation();
    }
    
});
const tdAddBoxActive = () => {
    if(todoList.length !== 0) tdChangeDesc(2);
    else tdChangeDesc(1);
    document.querySelector(".tl-btn-new").classList.add("tl-btn-new-active");
    document.querySelector(".tl-btn-box").classList.add("tl-btn-box-active");
    document.querySelector(".tl-btn-category").focus();
}
const tdAddBoxBlur = () => {
    tdChangeDesc(0);
    document.querySelector(".tl-btn-new").classList.remove("tl-btn-new-active");
    document.querySelector(".tl-btn-box").classList.remove("tl-btn-box-active");
}
const tdBlankCheck = () => {
    const category = document.querySelector(".tl-btn-category")
    const todo = document.querySelector(".tl-btn-todo")
    if(category.value.trim() === "" || todo.value.trim() === ""){
        if(category.value.trim() === ""){
            alert("카테고리를 채워주세요.");
            document.querySelector(".tl-btn-category").focus();
            return false;
        }else{
            alert("할 일을 채워주세요.");
            document.querySelector(".tl-btn-todo").focus();
            return false;
        }
    }
    return true;
}
const tdAddClickHandler = () => {
    if(tdBlankCheck()){
        const category = document.querySelector(".tl-btn-category");
        const todo = document.querySelector(".tl-btn-todo");
        const data = {"category" : category.value, "todo" : todo.value, "id" : tdId++, "done" : "♡"};
        todoList = [...todoList, data];
        category.value = "";
        todo.value = "";
        document.querySelector(".tl-btn-category").focus();
        
        tdTargetLoad();
    }
}

// add Event | listHandler
const tdClearList = () => {
    const ul = document.querySelector(".tl-list-main-box");
    const child = document.querySelectorAll(".tl-list-main-box li");
    child.forEach(i => ul.removeChild(i));
}

const tdCreateList = () => {
    const ul = document.querySelector(".tl-list-main-box");
    tdClearList();
    todoList.forEach(i => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const input = document.createElement("input");
        const cateSpan = document.createElement("span");
        const todoSpan = document.createElement("span");
        const done = document.createElement("span");
        div.classList.add("tl-list-main-id");
        input.classList.add("tl-list-main-check");
        cateSpan.classList.add("tl-list-main-category");
        todoSpan.classList.add("tl-list-main-todo");
        done.classList.add("tl-list-main-done");
        input.type = "checkbox";
        input.value = i.id;
        div.innerText = i.id;
        cateSpan.innerText = i.category;
        todoSpan.innerText = i.todo;
        todoSpan.ondblclick = tdEditHandler;
        cateSpan.ondblclick = tdEditHandler;
        done.innerText = i.done;
        if(i.done === "♥") done.classList.add("tl-done");
        done.draggable = "false";
        done.onclick = tdDoneHandler;
        li.classList.add("tl-list-main-data");
        li.appendChild(div);
        li.appendChild(input);
        li.appendChild(cateSpan);
        li.appendChild(todoSpan);
        li.appendChild(done);
        ul.appendChild(li);
    })
}

//checkBoxHandler
const tdAllCheckHandler = (e) => {
    const target = document.querySelector(".tl-method-select");
    let boxes = [];
    if(target.classList.contains("tl-method-list")){
        boxes = document.querySelectorAll(".tl-list-main-check");
    }else{
        boxes = document.querySelectorAll(".tl-post-main-check");
    }
    if(e.target.checked === true){
        boxes.forEach(i => i.checked = true)
    }else{
        boxes.forEach(i => i.checked = false)
    }
}

//add Event || postHandler
const tdClearPost = () => {
    const ul = document.querySelector(".tl-post-main-box");
    const child = document.querySelectorAll(".tl-post-main-box li");
    child.forEach(i => ul.removeChild(i));
}

const tdCreatePost = () => {
    const ul = document.querySelector(".tl-post-main-box");
    tdClearPost();
    todoList.forEach(i => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const cateSpan = document.createElement("span");
        const todoSpan = document.createElement("span");
        const done = document.createElement("span");
        const deletion = document.createElement("input");
        deletion.classList.add("tl-post-main-check");
        done.classList.add("tl-post-main-done");
        todoSpan.classList.add("tl-post-main-todo");
        cateSpan.classList.add("tl-post-main-category");
        div.classList.add("tl-post-main-id");
        deletion.type = "checkbox";
        deletion.value = i.id;
        done.innerText = i.done;
        todoSpan.innerText = i.todo;
        cateSpan.innerText = i.category;
        todoSpan.ondblclick = tdEditHandler;
        cateSpan.ondblclick = tdEditHandler;
        if(i.done === "♥") done.classList.add("tl-done");
        done.draggable = "false";
        done.onclick = tdDoneHandler;
        div.innerText = i.id;
        li.classList.add("tl-post-main-data");
        li.appendChild(div);
        li.appendChild(cateSpan);
        li.appendChild(done);
        li.appendChild(deletion);
        li.appendChild(todoSpan);
        ul.appendChild(li);
    });
}

// doneEvent 
const tdDoneHandler = (e) => {
    const id = e.path[1].childNodes[0].innerText;
    const target = todoList.filter(i => i.id == id);
    const index = todoList.indexOf(target[0]);
    if(e.target.innerText === "♡"){
        e.target.innerText = "♥";
        e.target.classList.add("tl-done");
        todoList[index].done = "♥";
    }else{
        e.target.innerText = "♡";
        e.target.classList.remove("tl-done");
        todoList[index].done = "♡";
    }
}
// deleteEvent
const tdDeleteHandler = () => {
    const target = document.querySelector(".tl-method-select");
    let check;
    if(target.classList.contains("tl-method-list")){
        check = document.querySelectorAll(".tl-list-main-check")
    }
    else{
        check = document.querySelectorAll(".tl-post-main-check")
    }
    let checked = [];
    check.forEach(i =>{
        if(i.checked === true) checked = [...checked, i]
    });
    if(checked.length !== 0){
        if(confirm(`${checked.length}개의 할 일을 삭제하시겠습니까?`)){
            checked.forEach(i => {
                const target = todoList.filter(j => i.value == j.id);
                const index = todoList.indexOf(target[0]);
                todoList.splice(index,1);
            })
            if(target.classList.contains("tl-method-list")) tdCreateList();
            else tdCreatePost();
        }
    }else alert("삭제할 할 일을 선택해주세요.");
}

// changeMethod
const tdChangeMethod = (e) => {
    if(tdwhileEditing){
        alert("수정을 완료한 후 눌러주세요.");
        return;
    }
    document.querySelector(".tl-method-select").classList.remove("tl-method-select");
    e.target.classList.add("tl-method-select");
    if(e.target.classList.contains("tl-method-list")){
        document.querySelector(".tl-list-box").style.display = "block";
        document.querySelector(".tl-post-box").style.display = "none";
        tdCreateList();
    }else{
        document.querySelector(".tl-list-box").style.display = "none";
        document.querySelector(".tl-post-box").style.display = "block";
        tdCreatePost();
    }
}

//sortArray
const tdSorting = (e) => {
    tdChangeDesc(3);
    const name = e.target.className; 
    if(String(name).includes("category")){
        todoList.sort(function(a,b){
            return a.category < b.category ? -1 : a.category > b.category ? 1: 0;
        });
    }else{
        todoList.sort(function(a,b){
            return a.todo < b.todo ? -1 : a.todo > b.todo ? 1: 0;
        });
    }
    tdTargetLoad();
}

// findTarget
const tdTargetLoad = () => {
    const target = document.querySelector(".tl-method-select");
    if(target.classList.contains("tl-method-list")) tdCreateList();
    else tdCreatePost();
}

// editHandler
let tdwhileEditing = false;
const tdEditHandler = (e) => {
    if(!tdwhileEditing){
        tdChangeDesc(4);
        tdwhileEditing = true;
        const parent = e.path[1];
        const target = e.target;
        const value = e.target.innerText;
        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.maxLength = "20";
        input.classList.add("tl-while-edit");
        input.classList.add(e.target.className);
        parent.replaceChild(input, target);
        input.focus();
    }else return;
}
const tdEditCompletion = () => {
    const target = document.querySelector(".tl-while-edit");
    target.classList.remove("tl-while-edit");
    const name = target.className;
    const value = target.value;
    const parent = target.parentNode;
    const id = parent.childNodes[0].innerText;
    const data = todoList.filter(i => i.id == id);
    const index = todoList.indexOf(data[0]);
    if(String(name).includes("category")){
        todoList[index].category = value;
    }else{
        todoList[index].todo = value;
    }
    tdwhileEditing = false;
    tdTargetLoad();
    tdChangeDesc(5);
}
const tdEditCancelation = () => {
    tdwhileEditing = false;
    tdTargetLoad();
    tdChangeDesc(5);
}