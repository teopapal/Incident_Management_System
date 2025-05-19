var lat = null;
var lon = null;
var addressDetails = null;
function password_match(id) {
    var password = document.getElementById(id).value;
    var confirm_password = document.getElementById("confirm_password").value;
    var password_error = document.getElementById("password_error");

    if (password !== confirm_password) {
        password_error.textContent = "Passwords do not match.";
    } else {
        password_error.textContent = "";
    }
}

function show_password(id) {
    var element = document.getElementById(id);
    if (element.type === "password") {
        element.type = "text";
    } else {
        element.type = "password";
    }
}

function password_strength() {
    var password = document.getElementById("password").value;
    var password_strength = document.getElementById("password_strength");
    var submit = document.getElementById("submit");
    var banned_words = ["fire", "fotia", "ethelontis", "volunteer"];

    if (banned_words.some(word => password.toLowerCase().includes(word.toLowerCase()))) {
        password_strength.textContent = "Password contains forbidden words.";
        password_strength.style.color = "red";
        submit.disabled = true;
        return;
    }

    // Check for strong password: at least one lowercase, one uppercase, one digit, and one symbol
    var has_lower = /[a-z]/.test(password);
    var has_upper = /[A-Z]/.test(password);
    var has_digit = /\d/.test(password);
    var has_symbol = /[@$!%*?&]/.test(password);

    // Check if 50% or more of password has digits
    var digit_count = (password.match(/\d/g) || []).length;                         // Count the number of digits in the password

    if (digit_count >= password.length/2) {
        password_strength.textContent = "Password has too many digits.";
        password_strength.style.color = "red";
        submit.disabled = true;
        return;
    }

    // Check if 50% or more of password has the same character
    var char_count = {};
    for (let char of password) {
        if (char in char_count) {
            char_count[char]++;
        } else {
            char_count[char] = 1;
        }
    }

    var max_char = Math.max(...Object.values(char_count));
    if (max_char >= password.length/2) {
        password_strength.textContent = "Password has too many of the same character.";
        password_strength.style.color = "red";
        submit.disabled = true;
        return;
    }

    // Password Strength Check
    if (has_lower && has_upper && has_digit && has_symbol) {
        password_strength.textContent = "Strong Password";
        password_strength.style.color = "green";
        submit.disabled = false;
    } else if ((has_lower || has_upper) && has_digit && password.length >= 6) {
        password_strength.textContent = "Medium Password";
        password_strength.style.color = "orange";
        submit.disabled = false;
    } else {
        password_strength.textContent = "Weak Password";
        password_strength.style.color = "red";
        submit.disabled = true;
    }
}

function user_registration() {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var type = document.getElementById("type").value;
    var first_name = document.getElementById("firstname").value;
    var last_name = document.getElementById("lastname").value;
    var birthdate = document.getElementById("birthdate").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var afm = document.getElementById("afm").value;
    var country = document.getElementById("country").value;
    var prefecture = document.getElementById("prefecture").value;
    var municipality = document.getElementById("municipality").value;
    var job = document.getElementById("job").value;
    var phone = document.getElementById("telephone").value;
    var address = document.getElementById("address").value;
    var tos = document.getElementById("terms").checked;

    var json = {
        "username": username,
        "password": password,
        "email": email,
        "type": type,
        "firstname": first_name,
        "lastname": last_name,
        "birthdate": birthdate,
        "gender": gender,
        "afm": afm,
        "country": country,
        "prefecture": prefecture,
        "municipality": municipality,
        "job": job,
        "telephone": phone,
        "address": address,
        "lat": lat,
        "lon": lon,
        "tos": tos
    };

    const json_output = document.getElementById("json");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/user/registration", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                json_output.textContent = "Response: " + xhr.responseText;
            } else {
                json_output.textContent = "Error: " + xhr.status;
            }
        }
    };

    xhr.send(JSON.stringify(json));
}

function volunteer_fields() {
    var user_type = document.getElementById("type").value;
    var volunteer_fields = document.getElementById("volunteer_fields");
    var tos_text = document.getElementById("tos_text");

    if (user_type === "volunteer") {
        volunteer_fields.style.display = "block";
        tos_text.innerText = 'Απαγορεύεται η άσκοπη χρήση της εφαρμογής. Συμφωνώ πως η άσκοπη χρήση της θα διώκεται ποινικά. Δηλώνω υπεύθυνα ότι ανήκω στο ενεργό δυναμικό των εθελοντών πυροσβεστών.';
    } else {
        volunteer_fields.style.display = "none";
        tos_text.innerText = 'Απαγορεύεται η άσκοπη χρήση της εφαρμογής. Συμφωνώ πως η άσκοπη χρήση της θα διώκεται ποινικά.';
    }
}

window.onload = function() {
    volunteer_fields();
}

function rapidapi() {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const obj = JSON.parse(xhr.responseText);
            if (Object.keys(obj).length === 0 && obj.constructor === Object){ 
                document.getElementById("address_check").innerHTML= "No address found"; 
                return;
            }
            addressDetails=obj[0];
            document.getElementById("address_check").innerHTML="";                                      //clear the previous results
            if (!addressDetails.display_name.includes("Crete")){
                document.getElementById("address_check").innerHTML="Address not found in Crete";
                return;
            }
            lat = addressDetails.lat;
            lon = addressDetails.lon;
            add_marker(set_position(lat, lon), addressDetails.display_name);
            for(var name in addressDetails)
            document.getElementById("address_check").innerHTML+=name+" "+addressDetails[name]+"<br>";
        }
    });
    var address_name = document.getElementById("address").value;
    var municipality = document.getElementById("municipality").value;
    var prefecture = document.getElementById("prefecture").value;
    var country = document.getElementById("country").value;
    var address=address_name+", " +municipality+", " +prefecture+", " +country; 
    
    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q="+address+"&accept-language=en&limit=5&bounded=0&polygon_text=0&polygon_svg=0&polygon_kml=0&polygon_geojson=0&polygon_threshold=0.0");
    
    xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
    var key="a9030dbd85msh334962d22f67acbp1e0574jsn176a9788fbcb";
    xhr.setRequestHeader("x-rapidapi-key", key);
    
    xhr.send();
}

function update_user() {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password2").value;
    var email = document.getElementById("email").value;
    var first_name = document.getElementById("firstname").value;
    var last_name = document.getElementById("lastname").value;
    var birthdate = document.getElementById("birthdate").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var country = document.getElementById("country").value;
    var prefecture = document.getElementById("prefecture").value;
    var municipality = document.getElementById("municipality").value;
    var job = document.getElementById("job").value;
    var address = document.getElementById("address").value;
    var tos = document.getElementById("terms").checked;


    var json = {
        "username": username,
        "password": password,
        "email": email,
        "firstname": first_name,
        "lastname": last_name,
        "birthdate": birthdate,
        "gender": gender,
        "country": country,
        "prefecture": prefecture,
        "municipality": municipality,
        "job": job,
        "address": address,
        "lat": lat,
        "lon": lon,
        "tos": tos
    };

    console.log(json);

    const json_output = document.getElementById("json");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/user/update", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                json_output.textContent = "Response: " + xhr.responseText;
            } else {
                json_output.textContent = "Error: " + xhr.status;
            }
        }
    };

    xhr.send(JSON.stringify(json));
}

function update_volunteer() {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password2").value;
    var email = document.getElementById("email").value;
    var first_name = document.getElementById("firstname").value;
    var last_name = document.getElementById("lastname").value;
    var birthdate = document.getElementById("birthdate").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var country = document.getElementById("country").value;
    var prefecture = document.getElementById("prefecture").value;
    var municipality = document.getElementById("municipality").value;
    var job = document.getElementById("job").value;
    var address = document.getElementById("address").value;
    var tos = document.getElementById("terms").checked;


    var json = {
        "username": username,
        "password": password,
        "email": email,
        "firstname": first_name,
        "lastname": last_name,
        "birthdate": birthdate,
        "gender": gender,
        "country": country,
        "prefecture": prefecture,
        "municipality": municipality,
        "job": job,
        "address": address,
        "lat": lat,
        "lon": lon,
        "tos": tos
    };



    const json_output = document.getElementById("json");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/volunteer/update", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                json_output.textContent = "Response: " + xhr.responseText;
            } else {
                json_output.textContent = "Error: " + xhr.status;
            }
        }
    };

    xhr.send(JSON.stringify(json));
}

function volunteer_registration() {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var first_name = document.getElementById("firstname").value;
    var last_name = document.getElementById("lastname").value;
    var birthdate = document.getElementById("birthdate").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var afm = document.getElementById("afm").value;
    var country = document.getElementById("country").value;
    var address = document.getElementById("address").value;
    var municipality = document.getElementById("municipality").value;
    var prefecture = document.getElementById("prefecture").value;
    var job = document.getElementById("job").value;
    var phone = document.getElementById("telephone").value;
    var type = document.getElementById("volunteer_type").value;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;

    var json = {
        "username": username,
        "email": email,
        "password": password,
        "firstname": first_name,
        "lastname": last_name,
        "birthdate": birthdate,
        "gender": gender,
        "afm": afm,
        "country": country,
        "address": address,
        "municipality": municipality,
        "prefecture": prefecture,
        "job": job,
        "telephone": phone,
        "lat": lat,
        "lon": lon,
        "volunteer_type": type,
        "height": height,
        "weight": weight
    };

    const json_output = document.getElementById("json");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/servlet_war_exploded/volunteer/registration", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                json_output.textContent = "Response: " + xhr.responseText;
            } else {
                json_output.textContent = "Error: " + xhr.status;
            }
        }
    };

    xhr.send(JSON.stringify(json));
}

function get_determine_user() {
    const user_type = document.getElementById("user_type").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (user_type === "admin" && username === "admin" && password === "admiN12@*") {
        window.location.href = "admin.html";
    } else if (user_type === "volunteer") {
        getVolunteer();
        document.getElementById("formlol").style.display = "block";
    } else if (user_type === "registered_user") {
        getUser();
        document.getElementById("formlol").style.display = "none";
    } else {
        alert("Invalid User Type");
    }
}

function post_determine_user() {
    const user_type = document.getElementById("type").value;
    if (user_type === "user") {
        user_registration();
    } else if (user_type === "volunteer") {
        volunteer_registration();
    } else {
        console.log(user_type);
    }
}

function put_determine_user() {
    const user_type = document.getElementById("user_type").value;
    console.log("User Type: " + user_type);
    if (user_type === "registered_user") {
        update_user();
    } else if (user_type === "volunteer") {
        update_volunteer();
    }
    console.log(user_type);
}