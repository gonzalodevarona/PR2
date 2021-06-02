package providers;

import db.DBConnection;
import model.Task;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class TaskProvider {

    public void createTask(Task task) throws SQLException {
        if (task.getStatus().equalsIgnoreCase(Task.DO) || task.getStatus().equalsIgnoreCase(Task.DONE) || task.getStatus().equalsIgnoreCase(Task.DOING)){
            String sql = "INSERT INTO A00358687tasks(title, description, date, status) VALUES ('$TITLE', '$DESCRIPTION', '$DATE', '$STATUS')";
            sql = sql.replace("$TITLE", task.getTitle());
            sql = sql.replace("$DESCRIPTION", task.getDescription());
            sql = sql.replace("$DATE", task.getDate());
            sql = sql.replace("$STATUS", task.getStatus());
            DBConnection connection = new DBConnection();
            connection.connect();
            connection.commandSQL(sql);
            connection.disconnect();
        } else{
            throw new SQLException();
        }
    }

    public void editTask(Task task) throws SQLException {
        String sql = "UPDATE A00358687tasks SET status='$STATUS' WHERE id = '$ID'";
        sql = sql.replace("$ID", ""+task.getId());
        sql = sql.replace("$STATUS", task.getStatus());
        DBConnection connection = new DBConnection();
        connection.connect();
        connection.commandSQL(sql);
        connection.disconnect();

    }

    public void deleteTask(int dead) throws SQLException {

        String sql = "DELETE FROM A00358687tasks  WHERE id="+dead;

        DBConnection connection = new DBConnection();
        connection.connect();
        connection.commandSQL(sql);
        connection.disconnect();

    }

    public ArrayList<Task> getAllTasks() throws SQLException {
        ArrayList<Task> allTasks = new ArrayList<Task>();

        String sql = "SELECT * FROM A00358687tasks";

        DBConnection connection = new DBConnection();
        connection.connect();

        ResultSet resultSet = connection.getDataBySQL(sql);
        while (resultSet.next()){
            int id = resultSet.getInt(resultSet.findColumn("id"));
            String title = resultSet.getString(resultSet.findColumn("title"));
            String description = resultSet.getString(resultSet.findColumn("description"));
            String date = resultSet.getString(resultSet.findColumn("date"));
            String status = resultSet.getString(resultSet.findColumn("status"));

            Task newTask = new Task(id, title, description, date, status);
            allTasks.add(newTask);
        }

        connection.disconnect();

        return allTasks;
    }
}
