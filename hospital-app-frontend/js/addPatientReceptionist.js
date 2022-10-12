function addPatient() {

    // add the appointment
    var url = "http://localhost:8080/receptionist/patient";

    var birthday = new Date(document.getElementById('birthday').value);
    var birthdayStr = birthday.toISOString();
    birthdayStr = birthdayStr.substring(0, birthdayStr.indexOf('T'));

    var data = {
        insuranceId: document.getElementById('insuranceId').value,
        fullname: document.getElementById('fullname').value,
        gender: document.getElementById('gender').value,
        birthday: birthdayStr,
        address: document.getElementById('address').value
    };
    var json = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if (response == 1) {
                alert("Patient Added Succesfully1");
                window.location.href = "../html/patientsReceptionist.html";
            }
        }
    };
    xmlhttp.send(json);

}




