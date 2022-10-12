window.onload = function () {

    var patientId = sessionStorage.getItem('patientId');
    var patientName = sessionStorage.getItem('patientName');

    document.getElementById("header appointment").innerText = "Appointments For " + patientName;
    document.getElementById("header test").innerText = "Tests For " + patientName;

    // get all appointments
    var url = "http://localhost:8080/doctor/patients/" + patientId + "/appointments";

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

    getAllTests();

}

function insertRow(rowValues, index) {
    var table = document.getElementById("appointmentsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var dateCell = row.insertCell(1);
    var doctorCommentCell = row.insertCell(2);
    var appointmentStatusCell = row.insertCell(3);
    var doctorCell = row.insertCell(4);
    idCell.innerHTML = rowValues.id;
    dateCell.innerHTML = rowValues.appointmentBeginDate;
    doctorCommentCell.innerHTML = rowValues.doctorComment;
    appointmentStatusCell.innerHTML = rowValues.appointmentStatus;
    doctorCell.innerHTML = rowValues.fullname;
}

function getAllTests(){

    var patientId = sessionStorage.getItem('patientId');
    // get all appointments
    var url = "http://localhost:8080/doctor/patients/" + patientId + "/tests";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            var index = 1;
            for (const responseElement of response) {
                insertRowTest(responseElement, index++);
            }
        }
    };
    xmlhttp.send();
}

function insertRowTest(rowValues, index) {
    var table = document.getElementById("testsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var dateCell = row.insertCell(1);
    var testTypeCell = row.insertCell(2);
    var testStatusCell = row.insertCell(3);
    var diagnosisCell = row.insertCell(4);
    idCell.innerHTML = rowValues.id;
    dateCell.innerHTML = rowValues.testDate;
    testTypeCell.innerHTML = rowValues.testType;
    testStatusCell.innerHTML = rowValues.testStatus;
    diagnosisCell.innerHTML = rowValues.diagnosis;

}
