window.onload = function () {

    getPayments();
    getNotPaidAppointments();
    getNotPaidTests();


}

function getPayments() {
    var url = "http://localhost:8080/receptionist/payments";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            var indexAppointment = 1;
            var indexTest = 1;
            for (const responseElement of response) {
                if (responseElement.appointmentId != null) {
                    insertRowAppointmentPayment(responseElement, indexAppointment++);
                } else {
                    insertRowTestPayment(responseElement, indexTest++);
                }
            }
        }
    };
    xmlhttp.send();
}

function getNotPaidAppointments() {
    var url = "http://localhost:8080/receptionist/appointments/not-paid";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            var index = 1;
            for (const responseElement of response) {
                insertRowAppointmentNotPaid(responseElement, index++);
            }
        }
    };
    xmlhttp.send();
}

function getNotPaidTests() {
    var url = "http://localhost:8080/receptionist/tests/not-paid";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            var index = 1;
            for (const responseElement of response) {
                insertRowTestNotPaid(responseElement, index++);
            }
        }
    };
    xmlhttp.send();
}

function insertRowAppointmentPayment(rowValues, index) {
    var table = document.getElementById("appointmentsPaymentsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var fullnameCell = row.insertCell(1);
    var paymentDateCell = row.insertCell(2);
    var priceCell = row.insertCell(3);
    idCell.innerHTML = rowValues.appointmentId;
    fullnameCell.innerHTML = rowValues.fullname;
    paymentDateCell.innerHTML = rowValues.paymentDate;
    priceCell.innerHTML = rowValues.price;
}

function insertRowTestPayment(rowValues, index) {
    var table = document.getElementById("testsPaymentsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var fullnameCell = row.insertCell(1);
    var paymentDateCell = row.insertCell(2);
    var priceCell = row.insertCell(3);
    idCell.innerHTML = rowValues.testId;
    fullnameCell.innerHTML = rowValues.fullname;
    paymentDateCell.innerHTML = rowValues.paymentDate;
    priceCell.innerHTML = rowValues.price;
}

function insertRowAppointmentNotPaid(rowValues, index) {
    var table = document.getElementById("appointmentsWaitingPaymentsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var dateCell = row.insertCell(1);
    var appointmentStatusCell = row.insertCell(2);
    var patientCell = row.insertCell(3);
    var doctorCell = row.insertCell(4);
    var priceCell = row.insertCell(5);
    idCell.innerHTML = rowValues.id;
    dateCell.innerHTML = rowValues.appointmentBeginDate;
    appointmentStatusCell.innerHTML = rowValues.appointmentStatus;
    patientCell.innerHTML = rowValues.patient;
    doctorCell.innerHTML = rowValues.doctor;
    priceCell.innerHTML = rowValues.appointmentPrice;
}

function insertRowTestNotPaid(rowValues, index) {
    var table = document.getElementById("testsWaitingPaymentsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var dateCell = row.insertCell(1);
    var typeCell = row.insertCell(2);
    var statusCell = row.insertCell(3);
    var patientCell = row.insertCell(4);
    var doctorCell = row.insertCell(5);
    var priceCell = row.insertCell(6);
    idCell.innerHTML = rowValues.id;
    dateCell.innerHTML = rowValues.testDate;
    typeCell.innerHTML = rowValues.testType;
    statusCell.innerHTML = rowValues.testStatus;
    patientCell.innerHTML = rowValues.patient;
    doctorCell.innerHTML = rowValues.doctor;
    priceCell.innerHTML = rowValues.testPrice;
}


