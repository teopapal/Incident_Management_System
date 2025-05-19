package servlets.messages;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import database.init.InitDatabase;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/message/send")
public class SendMessage extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            BufferedReader reader = request.getReader();
            Gson gson = new Gson();
            JsonObject json = gson.fromJson(reader, JsonObject.class);
            response.setContentType("text/plain");
            response.getWriter().write(InitDatabase.add_message_to_database(json));
        } catch (Exception e) {
            response.getWriter().write(e.getMessage());
        }
    }
}
