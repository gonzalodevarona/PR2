class TaskView{

    constructor(task){
        this.task = task;
        this.onDeleteFinish = null;
    }


    deleteTask = ()=>{
        
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', ()=>{
            if(xhr.readyState === 4){
                if(this.onDeleteFinish !== null){
                    this.onDeleteFinish();
                }
            }
            
        });
        xhr.open('DELETE', '/parcial2_war/api/tasks/deleteTask/'+ this.task.id );
        xhr.send();
    }


    render = () =>{
        let component = document.createElement('div');
        component.className = 'task-area';

        let title = document.createElement('p');
        let description = document.createElement('p');
        let date = document.createElement('small');




        title.innerHTML = this.task.title;
        description.innerHTML = this.task.description;
        date.innerHTML = this.task.date;




        let close = document.createElement('button');
        close.className = 'close-btn btn';

        let left = document.createElement('button');
        left.className = 'left-btn btn';

        let right = document.createElement('button');
        right.className = 'right-btn btn';

        let btnsContainer = document.createElement('div');
        btnsContainer.className = 'btns-container';


        close.innerHTML = "X";
        right.innerHTML = " -> ";
        left.innerHTML = " <- ";

        btnsContainer.appendChild(left);
        btnsContainer.appendChild(right);

        component.appendChild(title);
        component.appendChild(description);
        component.appendChild(date);
        component.appendChild(close);
        component.appendChild(btnsContainer);


        //EVENTS FOR NEW BUTTONS

        close.addEventListener('click', this.deleteTask);
        

        

        return component;

    }

}