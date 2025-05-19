package servlets.incidents;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import database.tables.EditIncidentsTable;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;

@WebServlet("/incident/update")
public class UpdateIncident extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            BufferedReader reader = request.getReader();
            StringBuilder jsonInput = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonInput.append(line);
            }

            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(jsonInput.toString(), JsonObject.class);

            String id = jsonObject.get("incident_id").getAsString();
            new EditIncidentsTable().updateIncident(id, gson.fromJson(jsonObject, HashMap.class));
            response.getWriter().write("Incident updated successfully");

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Error: " + e.getMessage());
        }
    }
}

