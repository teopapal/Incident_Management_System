package servlets.volunteers;

import database.init.InitDatabase;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/volunteers")
public class GetVolunteers extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {

            String username = request.getParameter("username");
            String password = request.getParameter("password");

            response.getWriter().write(InitDatabase.get_volunteers(username, password));

        } catch (Exception e) {
            response.getWriter().write("Error: " + e.getMessage());
        }

    }
}