function incident_registration_guest() {
    const phone = document.getElementById("phone").value;
    const description = document.getElementById("description").value;
    const incident_type = document.getElementById("incident_type").value;

    const json = {
        "user_phone": phone,
        "description": description,
        "incident_type": incident_type,
        "status": "submitted"
    };
    console.log(json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/incident/registration", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(json));
}




function incident_registration_user() {
    const des = document.getElementById("des").value;
    const inci_type = document.getElementById("inci_type").value;

    const json = {
        "user_phone": phone,
        "description": des,
        "incident_type": inci_type,
        "status": "submitted"
    };

    if (phone == null || phone === "") {
        alert("Phone must be filled out");
        return false;
    }
    console.log(json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/incident/registration", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(json));
}
