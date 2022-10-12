window.onload = function () {

    // get departments
    getDepartments();


}

function addDoctor() {

    // add the appointment
    var url = "http://localhost:8080/receptionist/doctor";


    var data = {
        title: document.getElementById('title').value,
        fullname: document.getElementById('fullname').value,
        gender: document.getElementById('gender').value,
        depID: document.getElementById('department').value,
        supervisorId: document.getElementById('supervisorId').value
    };
    var json = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if (response == 1) {
                alert("Doctor Added Succesfully1");
                window.location.href = "../html/doctorsReceptionist.html";
            }
        }
    };
    xmlhttp.send(json);

}

function getDepartments() {

    var selectDepartment = document.getElementById('department');

    var url = "http://localhost:8080/receptionist/departments";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            for (const responseElement of response) {
                var option = document.createElement('option');
                option.text = responseElement.departmentName;
                option.value = responseElement.id;
                selectDepartment.add(option);
            }
        }
    };
    xmlhttp.send();

}




