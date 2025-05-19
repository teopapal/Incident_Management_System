package servlets.volunteers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import database.init.InitDatabase;
import database.tables.EditUsersTable;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;

@WebServlet("/volunteer/update")
public class UpdateVolunteer extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try (BufferedReader reader = request.getReader()) {
            Gson gson = new Gson();
            JsonObject json = gson.fromJson(reader, JsonObject.class);

            String resultMessage = InitDatabase.update_volunteer_to_database(json);

            JsonObject successResponse = new JsonObject();
            successResponse.addProperty("status", "success");
            successResponse.addProperty("message", resultMessage);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(successResponse.toString());

        } catch (Exception e) {
            response.getWriter().write(e.getMessage());
        }
    }
}
