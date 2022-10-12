function login(){

    var username = document.getElementById("usernameInput").value;
    var passwd = document.getElementById("passwdInput").value;

    if(username == ""){
        alert("Username is required !");
    } else if(passwd == ""){
        alert("Password is required !");
    } 
    // inputs are are all filled
    else {
        // send login request
        var data = {
            id: username,
            password: passwd
        };

        var json = JSON.stringify(data);

        var url = "http://localhost:8080/login";

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST",url,false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText)
                console.log(response);
                sessionStorage.setItem('userId', response.userId);
                var userRole = response.userRole;
                if(userRole === "DOCTOR"){
                    window.location.href = "../html/homeDoctor.html";
                } else if(userRole === "PATIENT"){
                    window.location.href = "../html/homePatient.html";
                } else if(userRole === "RECEPTIONIST"){
                    window.location.href = "../html/homeReceptionist.html";
                } else {
                    // UNKNOWN USER TYPE
                }
            }
        };
        xmlhttp.send(json);
        
    }   
    
}
