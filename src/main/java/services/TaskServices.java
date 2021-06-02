package services;

import providers.TaskProvider;

import javax.ws.rs.*;
import model.*;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.ArrayList;

@Path("tasks")
public class TaskServices {

    @POST
    @Path("createTask")
    @Consumes("application/json")
    public Response createTask(Task task){

        try {
            TaskProvider provider = new TaskProvider();
            provider.createTask(task);

            return Response.ok(new Message("Success")).header("Content-type", "application/json").build();
        } catch (SQLException e) {
            e.printStackTrace();

            return Response.status(500).entity(new Message("ERROR")).header("Content-type", "application/json").build();
        }
    }

    @PUT
    @Path("updateTask")
    @Consumes("application/json")
    public Response updateTask(Task task){


        try {
            TaskProvider provider = new TaskProvider();
            provider.editTask(task);

            return Response.ok(new Message("Success")).header("Content-type", "application/json").build();

        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(500).entity(new Message("ERROR")).header("Content-type", "application/json").build();
        }


    }


    @DELETE
    @Path("deleteTask/{id}")
    public Response deleteTask(@PathParam("id") int id){


        try {
            TaskProvider provider = new TaskProvider();
            provider.deleteTask(id);

            return Response.ok(new Message("Success")).header("Content-type", "application/json").build();

        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(500).entity(new Message("ERROR")).header("Content-type", "application/json").build();
        }


    }


    @GET
    @Path("showAll")
    public Response showAllTasks(){


        try {
            TaskProvider provider = new TaskProvider();
            ArrayList<Task> allTasks =  provider.getAllTasks();

            return Response.ok(allTasks).header("Content-type", "application/json").build();

        } catch (SQLException e) {
            e.printStackTrace();
            return Response.status(500).entity(new Message("ERROR")).header("Content-type", "application/json").build();
        }


    }
}
