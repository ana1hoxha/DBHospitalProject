
genders = ["f","m"]

window.onload = function () {

    var patientId = sessionStorage.getItem('patientId');

    // get the patient
    var url = "http://localhost:8080/receptionist/patient/" + patientId;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            document.getElementById('id').value = response.id;
            var birthday = new Date(response.birthday);
            var birthdayStr = birthday.toISOString();
            birthdayStr = birthdayStr.substring(0, birthdayStr.indexOf('T'));
            document.getElementById('insuranceId').value = response.insuranceId;
            document.getElementById('fullname').value = response.fullname;
            document.getElementById('gender').selectedIndex = genders.indexOf(response.gender);
            document.getElementById('birthday').value = birthdayStr;
            document.getElementById('address').value = response.address;
        }
    };
    xmlhttp.send();

}

function savePatient() {

    // save the patient
    var url = "http://localhost:8080/receptionist/patient";

    var birthday = new Date(document.getElementById('birthday').value);
    var birthdayStr = birthday.toISOString();
    birthdayStr = birthdayStr.substring(0, birthdayStr.indexOf('T'));

    var data = {
        id: document.getElementById('id').value,
        insuranceId: document.getElementById('insuranceId').value,
        fullname: document.getElementById('fullname').value,
        gender: document.getElementById('gender').value,
        birthday: birthdayStr,
        address: document.getElementById('address').value
    };
    var json = JSON.stringify(data);


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if(response == 1){
                alert("Patient Updated Succesfully1");
                window.location.href = "../html/patientsReceptionist.html";
            }
        }
    };
    xmlhttp.send(json);

}

