package servlets.volunteers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import database.init.InitDatabase;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/volunteer/registration")
public class RegisterVolunteer extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        StringBuilder jsonString = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonString.append(line);
            }
        }
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(jsonString.toString(), JsonObject.class);
        try {
            System.out.println(InitDatabase.add_volunteers_to_database(jsonObject));
            response.getWriter().println(gson.toJson(jsonObject));


        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException(e);
        }
    }
}

