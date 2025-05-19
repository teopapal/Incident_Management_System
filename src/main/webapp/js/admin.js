window.addEventListener("load", function (){
    getIncident();
    getMessage();
    getParticipants();
});

function getIncident() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            const resultContainer = document.getElementById("incident_results");
            console.log(response);

            if (response.length > 0) {
                let incidentsHTML = "<h2>All Incidents:</h2><ul>";
                response.forEach(incident => {
                    incidentsHTML += `
                        <li>
                            <strong>Type:</strong> <input type="text" id="type_${incident.incident_id}" value="${incident.incident_type}"> <br>
                            <strong>ID:</strong> ${incident.incident_id} <br>
                            <strong>Description:</strong> <input type="text" id="desc_${incident.incident_id}" value="${incident.description}"> <br>
                            <strong>Danger:</strong> <input type="text" id="danger_${incident.incident_id}" value="${incident.danger}"> <br>
                            <strong>Status:</strong> <input type="text" id="status_${incident.incident_id}" value="${incident.status}"> <br>
                            <strong>Vehicles:</strong> <input type="text" id="vehicles_${incident.incident_id}" value="${incident.vehicles}"> <br>
                            <strong>Firemen:</strong> <input type="text" id="firemen_${incident.incident_id}" value="${incident.firemen}"> <br>
                            <button onclick="incident_update(${incident.incident_id})">Update</button>
                        </li><hr>`;
                });
                incidentsHTML += "</ul>";

                resultContainer.innerHTML = incidentsHTML;
            } else {
                resultContainer.innerHTML = "<p>No incidents found.</p>";
            }
        } else {
            document.getElementById("incident_results").innerHTML = "<p>Error fetching incidents.</p>";
        }
    };

    xhr.open('GET', 'http://localhost:8080/servlet_war_exploded/incidents');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function incident_update(incident_id) {
    event.preventDefault();

    const incident_type = document.getElementById(`type_${incident_id}`).value;
    const description = document.getElementById(`desc_${incident_id}`).value;
    const danger = document.getElementById(`danger_${incident_id}`).value;
    const status = document.getElementById(`status_${incident_id}`).value;
    const vehicles = document.getElementById(`vehicles_${incident_id}`).value;
    const firemen = document.getElementById(`firemen_${incident_id}`).value;

    const json = {
        "incident_id": incident_id.toString(),
        "incident_type": incident_type,
        "description": description,
        "danger": danger,
        "status": status,
        "vehicles": vehicles,
        "firemen": firemen
    };

    console.log("Sending JSON:", json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/incident/update", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log("Server Response:", xhr.status, xhr.responseText);
            if (xhr.status === 200) {
                alert("Incident updated successfully!");
            } else {
                alert("Error updating incident: " + xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(json));
}

function participants_update(participant_id) {
    event.preventDefault();

    const volunteer_type = document.getElementById(`volunteer_type${participant_id}`).value;
    const volunteer_username = document.getElementById(`volunteer_username${participant_id}`).value;
    const status = document.getElementById(`status${participant_id}`).value;
    const incident_id = document.getElementById(`incident_id${participant_id}`).value;

    const json = {
        "participant_id": participant_id.toString(),
        "volunteer_type": volunteer_type,
        "volunteer_username": volunteer_username,
        "status": status,
        "incident_id": incident_id
    };

    console.log("Sending JSON:", json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/participant/update", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log("Server Response:", xhr.status, xhr.responseText);
            if (xhr.status === 200) {
                alert("Participant updated successfully!");
            } else {
                alert("Error updating participant: " + xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(json));
}


function getMessage() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            const resultContainer = document.getElementById("message_results");
            console.log(response);

            if (response.length > 0) {
                let messagesHTML = "<h2>Messages:</h2><ul>";
                response.forEach(message => {
                    messagesHTML += `
                        <li>
                            <strong>Title:</strong> ${message.message} <br>
                            <strong>Date time:</strong> ${message.date_time} <br> 
                            <strong>Sender:</strong> ${message.sender} <br>
                            <strong>Recipient:</strong> ${message.recipient} <br>
                        </li><hr>`;
                });
                messagesHTML += "</ul>";

                resultContainer.innerHTML = messagesHTML;
            } else {
                resultContainer.innerHTML = "<p>No messages found.</p>";
            }
        } else if (xhr.status !== 200) {
            document.getElementById("message_results").innerHTML = "<p>Error fetching messages.</p>";
        }
    };

    xhr.onerror = function () {
        document.getElementById("message_results").innerHTML = "<p>Network error occurred while fetching messages.</p>";
    };

    xhr.open('GET', 'http://localhost:8080/servlet_war_exploded/messages');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function getParticipants() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            const resultContainer = document.getElementById("participants");
            console.log(response);

            if (response.length > 0) {
                let participantsHTML = "<h2>Participants:</h2><ul>";
                response.forEach(participants => {
                    participantsHTML += `
                        <li>
                            <strong>Volunteer Username:</strong> <input type="text" id="volunteer_username${participants.participant_id}" value="${participants.volunteer_username}"> <br>
                            <strong>Volunteer Type:</strong> <input type="text" id="volunteer_type${participants.participant_id}" value="${participants.volunteer_type}"> <br> 
                            <strong>Incident ID:</strong> <input type="text" id="incident_id${participants.participant_id}" value="${participants.incident_id}"> <br>
                            <strong>Status:</strong> <input type="text" id="status${participants.participant_id}" value="${participants.status}"> <br>
                            <button onclick="participants_update(${participants.participant_id})">Update</button>
                        </li><hr>`;
                });
                participantsHTML += "</ul>";

                resultContainer.innerHTML = participantsHTML;
            } else {
                resultContainer.innerHTML = "<p>No participants found.</p>";
            }
        } else if (xhr.status !== 200) {
            document.getElementById("participants").innerHTML = "<p>Error fetching participants.</p>";
        }
    };

    xhr.onerror = function () {
        document.getElementById("participants").innerHTML = "<p>Network error occurred while fetching participants.</p>";
    };

    xhr.open('GET', 'http://localhost:8080/servlet_war_exploded/participants');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}


function send_message() {
    const message = document.getElementById("des").value;
    const incident_id = document.getElementById("incident_id").value;

    const json = {
        incident_id: incident_id,
        "message": message,
        "sender": "admin",
        "recipient": "public"
    };


    console.log(json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/message/send", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(json));
}


