const title = document.getElementById('title');
const description = document.getElementById('description');
const btnAdd = document.getElementById('btn-add');

const doneContainer = document.getElementById('done');
const doContainer = document.getElementById('do');
const doingContainer = document.getElementById('doing');



const addNewTask = ()=>{
    if(title.value && description.value){
        var newTask = new Task(title.value , description.value);
        console.log(JSON.stringify(newTask));

        //Post
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', ()=>{
            if(xhr.readyState === 4){
                console.log(xhr.responseText);
            }
            
        });

        xhr.open('POST', '/parcial2_war/api/tasks/createTask');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(newTask));

        title.value = "";
        description.value = "";
        alert("Success adding your new task!");
    
    
    } else{
        alert("Error: The title or description of the task is missing");
    }

}

btnAdd.addEventListener('click', addNewTask);


const getAllTasks = ()=>{
    doContainer.innerHTML = '';
    doneContainer.innerHTML = '';
    doingContainer.innerHTML = '';

    //GET
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState === 4){
            let json = xhr.responseText;
            let response = JSON.parse(json);
            console.log(response);

            for(let i = 0; i < response.length; i++){
                let currentTask = response[i];
                let currentView = new TaskView(currentTask);
                currentView.onDeleteFinish = getAllTasks;
                classify(currentTask, currentView);
            }
            
        }
        
    });

    xhr.open('GET', '/parcial2_war/api/tasks/showAll');
    xhr.send();

}

getAllTasks();


function classify(currentTask, currentView){
    if(currentTask.status == "Do"){
        doContainer.appendChild(currentView.render())
    } else if(currentTask.status == "Done"){
        doneContainer.appendChild(currentView.render());
    } else{
        doingContainer.appendChild(currentView.render())
    }
    

}