window.onload = function () {

    // get all patients
    var url = "http://localhost:8080/receptionist/doctors";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            var index = 1;
            for (const responseElement of response) {
                insertRow(responseElement, index++);
            }
        }
    };
    xmlhttp.send();

}

function insertRow(rowValues, index) {
    var table = document.getElementById("doctorsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var titleCell = row.insertCell(1);
    var fullnameCell = row.insertCell(2);
    var genderCell = row.insertCell(3);
    var departmentCell = row.insertCell(4);
    var supervisorCell = row.insertCell(5);
    var actionsCell = row.insertCell(6);
    idCell.innerHTML = rowValues.id;
    titleCell.innerHTML = rowValues.title;
    fullnameCell.innerHTML = rowValues.fullname;
    genderCell.innerHTML = rowValues.gender;
    departmentCell.innerHTML = rowValues.departmentName;
    supervisorCell.innerHTML = rowValues.supervisor;
    actionsCell.innerHTML = "<button type=\"button\" class=\"btn btn-primary\" onclick=\"editDoctor(this)\"><i class=\"bi bi-pencil\"></i></button>" +
        "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteDoctor(this)\"><i class=\"bi bi-trash\"></i></button>";
}

function editDoctor(param) {
    var doctorId = param.parentElement.parentElement.cells[0].innerText;
    sessionStorage.setItem('doctorId', doctorId);
    window.location.href = "../html/editDoctorReceptionist.html";
}

function deleteDoctor(param) {
    var doctorId = param.parentElement.parentElement.cells[0].innerText;

    var url = "http://localhost:8080/receptionist/doctor/" + doctorId;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            alert("Doctor Deleted")
        }
    };
    xmlhttp.send();
    window.location.href = "doctorsReceptionist.html";
}

