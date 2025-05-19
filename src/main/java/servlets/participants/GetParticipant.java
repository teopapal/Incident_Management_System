package servlets.participants;

import database.init.InitDatabase;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/participants")
public class GetParticipant extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            response.getWriter().write(InitDatabase.get_participants());
        } catch (Exception e) {
            response.getWriter().write("Error: " + e.getMessage());
        }

    }
}