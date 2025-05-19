/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package database.tables;

import com.google.gson.Gson;
import database.DB_Connection;
import mainClasses.User;
import mainClasses.Volunteer;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Mike
 */
public class EditVolunteersTable {

 
    public void addVolunteerFromJSON(String json) throws ClassNotFoundException{
         Volunteer user=jsonToVolunteer(json);
         addNewVolunteer(user);
    }
    
     public Volunteer jsonToVolunteer(String json){
         Gson gson = new Gson();

        Volunteer user = gson.fromJson(json, Volunteer.class);
        return user;
    }
    
    public String volunteerToJSON(Volunteer user){
         Gson gson = new Gson();

        String json = gson.toJson(user, Volunteer.class);
        return json;
    }
    
   
    
    public void updateVolunteer(String username,String personalpage) throws SQLException, ClassNotFoundException{
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        String update="UPDATE volunteers SET personalpage='"+personalpage+"' WHERE username = '"+username+"'";
        stmt.executeUpdate(update);
    }
    
    public void printVolunteerDetails(String username) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM volunteers WHERE username = '" + username + "'");
            while (rs.next()) {
                System.out.println("===Result===");
                DB_Connection.printResults(rs);
            }

        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
    }

    public void myupdateVolunteer(String id, HashMap<String, String> updates) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        for (String key : updates.keySet()) {
            String update = "UPDATE users SET " + key + "='" + updates.get(key) + "' WHERE volunteer_id = '" + id + "'";
            stmt.executeUpdate(update);
        }

        stmt.close();
        con.close();
    }

    public void updateVolunteer(Volunteer volunteer) throws ClassNotFoundException {
        try {
            PreparedStatement pstmt = getPreparedStatement();

            pstmt.setString(1, volunteer.getEmail());
            pstmt.setString(2, volunteer.getPassword());
            pstmt.setString(3, volunteer.getFirstname());
            pstmt.setString(4, volunteer.getLastname());
            pstmt.setString(5, volunteer.getBirthdate());
            pstmt.setString(6, volunteer.getGender());
            pstmt.setString(7, volunteer.getCountry());
            pstmt.setString(8, volunteer.getAddress());
            pstmt.setString(9, volunteer.getMunicipality());
            pstmt.setString(10, volunteer.getPrefecture());
            pstmt.setString(11, volunteer.getJob());
            pstmt.setString(12, volunteer.getLat().toString());
            pstmt.setString(13, volunteer.getLon().toString());
            pstmt.setString(14, volunteer.getUsername());

            int rowsUpdated = pstmt.executeUpdate();

            if (rowsUpdated > 0) {
                System.out.println("# The volunteer was successfully updated in the database.");
            } else {
                System.out.println("# No volunteer found with the provided username.");
            }

            pstmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditVolunteersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public Volunteer databaseToVolunteer(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM volunteers WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            Gson gson = new Gson();
            Volunteer user = gson.fromJson(json, Volunteer.class);
            return user;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    

    
    
    public ArrayList<Volunteer> getVolunteers(String type) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();
        ArrayList<Volunteer> volunteers = new ArrayList<Volunteer>();
        ResultSet rs = null;
        try {
            if("simple".equals(type))
                 rs = stmt.executeQuery("SELECT * FROM volunteers WHERE volunteer_type= '" + "simple" + "'");
            else if ("driver".equals(type))
                 rs = stmt.executeQuery("SELECT * FROM volunteers WHERE volunteer_type= '" + "driver" + "'");

           
            while (rs.next()) {
                String json = DB_Connection.getResultsToJSON(rs);
                Gson gson = new Gson();
                Volunteer volunteer = gson.fromJson(json, Volunteer.class);
                volunteers.add(volunteer);
            }
            return volunteers;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }
    
    
    public String databaseVolunteerToJSON(String username, String password) throws SQLException, ClassNotFoundException{
         Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        ResultSet rs;
        try {
            rs = stmt.executeQuery("SELECT * FROM volunteers WHERE username = '" + username + "' AND password='"+password+"'");
            rs.next();
            String json=DB_Connection.getResultsToJSON(rs);
            return json;
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return null;
    }


     public void createVolunteersTable() throws SQLException, ClassNotFoundException {

        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "CREATE TABLE volunteers "
                  + "(volunteer_id INTEGER not NULL AUTO_INCREMENT, "
                + "    username VARCHAR(30) not null unique,"
                + "    email VARCHAR(50) not null unique,	"
                + "    password VARCHAR(32) not null,"
                + "    firstname VARCHAR(30) not null,"
                + "    lastname VARCHAR(30) not null,"
                + "    birthdate DATE not null,"
                + "    gender  VARCHAR (7) not null,"
                + "    afm  VARCHAR (10) not null,"
                + "    country VARCHAR(30) not null,"
                + "    address VARCHAR(100) not null,"
                + "    municipality VARCHAR(50) not null,"
                + "    prefecture VARCHAR(15) not null,"
                + "    job VARCHAR(200) not null,"
                + "    telephone VARCHAR(14) not null unique,"
                  + "    lat DOUBLE,"
                + "    lon DOUBLE,"
                + "    volunteer_type VARCHAR(10) not null,"
                + "    height DOUBLE,"
                + "    weight DOUBLE,"
                + " PRIMARY KEY (volunteer_id))";
        stmt.execute(query);
        stmt.close();
    }
    
    
    /**
     * Establish a database connection and add in the database.
     *
     * @throws ClassNotFoundException
     */
    public void addNewVolunteer(Volunteer user) throws ClassNotFoundException {
        try {
            Connection con = DB_Connection.getConnection();

            Statement stmt = con.createStatement();

            String insertQuery = "INSERT INTO "
                    + " volunteers (username,email,password,firstname,lastname,birthdate,gender,afm,country,address,municipality,prefecture,"
                    + "job,telephone,lat,lon,volunteer_type,height,weight)"
                    + " VALUES ("
                    + "'" + user.getUsername() + "',"
                    + "'" + user.getEmail() + "',"
                    + "'" + user.getPassword() + "',"
                    + "'" + user.getFirstname() + "',"
                    + "'" + user.getLastname() + "',"
                    + "'" + user.getBirthdate() + "',"
                    + "'" + user.getGender() + "',"
                    + "'" + user.getAfm() + "',"
                    + "'" + user.getCountry() + "',"
                    + "'" + user.getAddress() + "',"
                    + "'" + user.getMunicipality() + "',"                    
                    + "'" + user.getPrefecture() + "',"
                     + "'" + user.getJob() + "',"
                    + "'" + user.getTelephone() + "',"
                    + "'" + user.getLat() + "',"
                    + "'" + user.getLon() + "',"
                    + "'" + user.getVolunteer_type() + "',"
                    + "'" + user.getHeight()+ "',"
                    + "'" + user.getWeight() + "'"
                    + ")";
            //stmt.execute(table);
            System.out.println(insertQuery);
            stmt.executeUpdate(insertQuery);
            System.out.println("# The volunteer was successfully added in the database.");

            /* Get the member id from the database and set it to the member */
            stmt.close();

        } catch (SQLException ex) {
            Logger.getLogger(EditVolunteersTable.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private static PreparedStatement getPreparedStatement() throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();

        String updateQuery = "UPDATE volunteers SET "
                + "email = ?, "
                + "password = ?, "
                + "firstname = ?, "
                + "lastname = ?, "
                + "birthdate = ?, "
                + "gender = ?, "
                + "country = ?, "
                + "address = ?, "
                + "municipality = ?, "
                + "prefecture = ?, "
                + "job = ?, "
                + "lat = ?, "
                + "lon = ? "
                + "WHERE username = ?";

        return con.prepareStatement(updateQuery);
    }
   

}
