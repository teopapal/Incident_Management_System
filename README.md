# E-199 Incident Management System

A web-based emergency incident reporting and coordination platform, developed for the **HY-359 Web Programming** course at the **University of Crete**.  
The system facilitates real-time reporting, response coordination, and communication between citizens, volunteers, and the fire department.

---

## 🎯 Project Goals

- Simulate a real-world emergency response system using **modern web technologies**
- Allow **multiple user roles** (Admins, Registered Users, Volunteers, Guests)
- Provide **real-time updates**, notifications, and **interactive visualizations**
- Utilize **REST APIs**, **AJAX**, and **external services** (maps, ChatGPT, charts)

---

## 🧑‍🤝‍🧑 User Roles & Features

### 👨‍🚒 Fire Department Admin
- Secure admin-only login
- Create/update incidents (status, location, danger level)
- Assign and manage volunteer positions
- Send private/public messages
- View incident and volunteer statistics (charts)

### 👤 Registered User
- Register/login with editable profile
- Report new incidents with location and description
- Receive alerts for nearby incidents (within ~30km)
- Communicate with admin via messages
- View all active incidents on a **map or list**

### 🔥 Volunteer Firefighter
- Register/login with editable profile
- Request to participate in ongoing incidents
- Communicate directly with admins and fellow volunteers
- View assigned missions and historical participation

### 🌐 Guest User
- Submit incident reports without registration (phone number required)
- View all active incidents across Crete
- Access external resources and safety links
- Ask questions via **ChatGPT integration**

---

## 🌍 Core Technologies

- **Frontend**: HTML5, CSS3, JavaScript, AJAX
- **Backend**: Java Servlets, JSP, REST APIs
- **Database**: MySQL
- **Visualization**: Google Charts
- **Mapping**: OpenStreetMaps or Google Maps API
- **Distance Calculation**: TrueWay Matrix API (via RapidAPI)
- **ChatGPT Integration**: AI-powered Q&A

---

## 📊 System Features

- Real-time status updates for incidents (`submitted`, `running`, `finished`, `fake`)
- Role-based message boards
- Geolocation & distance-based notifications
- Historical incident search (bonus)
- Social sharing (bonus)
- Role-specific sound notifications (bonus)
- Full MVC architecture and responsive design

---

## 🔐 Admin Credentials (Default)

```text
Username: admin  
Password: admiN12@*
