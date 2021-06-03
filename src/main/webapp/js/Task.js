class Task{

    constructor( title, description){

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        this.id = 0;
        this.title = title;
        this.description = description;
        this.status = "Do";
        this.date = dateTime;

    }
}