let phone = "";
function createTableFromJSON(data) {
    let html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        const category = x;
        const value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    phone = data["telephone"];
    html += "</table>";
    return html;
}



function getUser() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html(createTableFromJSON(JSON.parse(xhr.responseText)));
            document.getElementById("hidden_button").style.display = "block";
            document.getElementById("user_details").style.display = "block";
            // set_session_cookies();
            // setInterval(check_session, 10000);
          //  $("#ajaxContent").html("Successful Login");
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("User not exists or incorrect password");
        }
    };
    const data = $('#loginForm').serialize();
    xhr.open('GET', 'http://localhost:8080/servlet_war_exploded/users?'+data);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function getVolunteer() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html(createTableFromJSON(JSON.parse(xhr.responseText)));
            document.getElementById("hidden_button").style.display = "block";
            document.getElementById("user_details").style.display = "block";
            // set_session_cookies();
            // setInterval(check_session, 10000);
           // $("#ajaxContent").html("Successful Login");
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("Volunteer not exists or incorrect password");
        }
    };
    const data = $('#loginForm').serialize();
    xhr.open('GET', 'http://localhost:8080/servlet_war_exploded/volunteers?'+data);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

window.addEventListener("load", function (){
    getIncident();
    getMessage();
});

function getIncident() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            const runningIncidents = response.filter(incident => incident.status === "running");

            const resultContainer = document.getElementById("incident_results");
            console.log(runningIncidents);

            if (runningIncidents.length > 0) {
                let incidentsHTML = "<h2>Running Incidents:</h2><ul>";
                runningIncidents.forEach(incident => {
                    incidentsHTML += `
                        <li>
                            <strong>Type:</strong> ${incident.incident_type} <br>
                            <strong>ID:</strong> ${incident.incident_id} <br>
                            <strong>Description:</strong> ${incident.description} <br>
                            <strong>Status:</strong> ${incident.status}
                        </li><hr>`;
                });
                incidentsHTML += "</ul>";

                resultContainer.innerHTML = incidentsHTML;
            } else {
                resultContainer.innerHTML = "<p>No running incidents found.</p>";
            }
        } else if (xhr.status !== 200) {
            document.getElementById("incident_results").innerHTML = "<p>Error fetching incidents.</p>";
        }
    };

    xhr.open('GET', 'http://localhost:8080/servlet_war_exploded/incidents');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}



function getMessage() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            const public_messages = response.filter(message => message.recipient === "public");

            const resultContainer = document.getElementById("message_results");
            console.log(public_messages);

            if (public_messages.length > 0) {
                let messagesHTML = "<h2>Messages:</h2><ul>";
                public_messages.forEach(message => {
                    messagesHTML += `
                        <li>
                            <strong>Title:</strong> ${message.message} <br>
                            <strong>Date time:</strong> ${message.date_time} <br> 
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




function initDB() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
              $("#ajaxContent").html("Successful Initialization");
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("Error Occured");
        }
    };

    xhr.open('GET', 'InitDB');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function deleteDB() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
              $("#ajaxContent").html("Successful Deletion");
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("Error Occured");
        }
    };

    xhr.open('GET', 'DeleteDB');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function logout() {
    // clear_cookies();
    alert("You have been logged out.");
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html("Successful Logout");
            window.location.reload();
        } else if (xhr.status !== 200) {
            $("#ajaxContent").html("Error Occured");
        }
    };

    xhr.open('POST', 'http://localhost:8080/servlet_war_exploded/logout', true);
    xhr.send();
}

function send_message() {
    const message = document.getElementById("des2").value;
    const incident_id = document.getElementById("incident_id").value;
    const username = document.getElementById("username").value;

    const json = {
        incident_id: incident_id,
        "message": message,
        "sender": username,
        "recipient": "public"
    };


    console.log(json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/message/send", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(json));
}

function send_participation() {
    const username = document.getElementById("username").value;
    const incident_id = document.getElementById("incident_id_participate").value;
    const volunteer_type = document.getElementById("volunteer_type").value;

    const json = {
        incident_id: incident_id,
        "volunteer_username": username,
        "status": "requested",
        "volunteer_type": volunteer_type
    };


    console.log(json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/participant/registration", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(json));
}

// function set_session_cookies() {
//     const expiry = new Date();
//     expiry.setMinutes(expiry.getMinutes() + 1);
//     document.cookie = `session=true; expires=${expiry.toUTCString()}; path=/; Secure`;
// }
//
// function check_session() {
//
//     const cookies = document.cookie.split(';').map(cookie => cookie.trim());
//     const session = cookies.find(cookie => cookie.startsWith('session=true'));
//     if (!session) {
//         alert("Session expired");
//         logout();
//     }
// }
//
//
// function clear_cookies() {
//     document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
// }

