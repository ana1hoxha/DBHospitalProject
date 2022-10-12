window.onload = function () {

    // get all appointments
    var url = "http://localhost:8080/receptionist/appointments";

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
    var table = document.getElementById("appointmentsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var dateCell = row.insertCell(1);
    var doctorCommentCell = row.insertCell(2);
    var statusCell = row.insertCell(3);
    var patientCell = row.insertCell(4);
    var doctorCell = row.insertCell(5);
    var priceCell = row.insertCell(6);
    var actionsCell = row.insertCell(7);
    idCell.innerHTML = rowValues.id;
    dateCell.innerHTML = rowValues.appointmentBeginDate;
    doctorCommentCell.innerHTML = rowValues.doctorComment;
    statusCell.innerHTML = rowValues.appointmentStatus;
    patientCell.innerHTML = rowValues.patient;
    doctorCell.innerHTML = rowValues.doctor;
    priceCell.innerHTML = rowValues.appointmentPrice;
    actionsCell.innerHTML = "<button type=\"button\" class=\"btn btn-primary\" onclick=\"editAppointment(this)\"><i class=\"bi bi-pencil\"></i></button>";
}

function editAppointment(param) {
    var appointmentId = param.parentElement.parentElement.cells[0].innerText;
    sessionStorage.setItem('appointmentId', appointmentId);
    window.location.href = "../html/editAppointmentReceptionist.html";
}

function deleteAppointment(param) {
    var appointmentId = param.parentElement.parentElement.cells[0].innerText;
}

