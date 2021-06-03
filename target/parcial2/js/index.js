const title = document.getElementById('title');
const description = document.getElementById('description');
const btnAdd = document.getElementById('btn-add');



const addNewTask = ()=>{
    if(title.value && description.value){
        var newTask = new Task(title.value , description.value);
        console.log(JSON.stringify(newTask));

        //Post
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', ()=>{
            console.log(xhr.responseText);
        });

        xhr.open('POST', '/parcial2_war/api/tasks/createTask');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(newTask));

        title.value = "";
        description.value = "";
        alert("Sucess adding your new task!");
    
    
    } else{
        alert("Error: The title or description of the task is missing");
    }

}

btnAdd.addEventListener('click', addNewTask);
