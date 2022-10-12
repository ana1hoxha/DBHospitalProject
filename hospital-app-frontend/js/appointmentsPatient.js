window.onload = function () {

    var userId = sessionStorage.getItem('userId');

    // get all appointments
    var url = "http://localhost:8080/patient/" + userId + "/appointments";

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
    var appointmentStatusCell = row.insertCell(3);
    var paymentStatusCell = row.insertCell(4);
    var doctorCell = row.insertCell(5);
    var priceCell = row.insertCell(6);
    var departmentCell = row.insertCell(7);
    var actionsCell = row.insertCell(8);
    idCell.innerHTML = rowValues.id;
    dateCell.innerHTML = rowValues.appointmentBeginDate;
    doctorCommentCell.innerHTML = rowValues.doctorComment;
    appointmentStatusCell.innerHTML = rowValues.appointmentStatus;
    paymentStatusCell.innerHTML = rowValues.paymentStatus;
    doctorCell.innerHTML = "<a onclick='openDoctorPage(" + rowValues.doctorId +")'>" + rowValues.doctorName + "</a>";
    priceCell.innerHTML = rowValues.appointmentPrice;
    departmentCell.innerHTML = rowValues.department;
    actionsCell.innerHTML = "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteAppointment(this)\"><i class=\"bi bi-trash\"></i></button>";
}

function deleteAppointment(param) {
    var appointmentId = param.parentElement.parentElement.cells[0].innerText;

    var url = "http://localhost:8080/patient/appointment/" + appointmentId + "/cancel";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            alert("Appointment Cancelled")
        }
    };
    xmlhttp.send();
    window.location.href = "appointmentsPatient.html";
}

function openDoctorPage(doctorId) {
    sessionStorage.setItem('doctorId', doctorId);
    window.location.href = "doctorPatient.html";
}

