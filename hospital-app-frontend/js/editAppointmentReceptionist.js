
var appointmentStatuses = ["CREATED", "CANCELLED BY PATIENT", "CANCELLED BY DOCTOR", "ATTENDED", "PATIENT NOT  SHOWED UP"];
var paymentStatuses = ["NOT PAID", "PAID"];

window.onload = function () {

    var appointmentId = sessionStorage.getItem('appointmentId');

    // get the appointment
    var url = "http://localhost:8080/receptionist/appointments/" + appointmentId;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            document.getElementById('appointmentId').value = response.id;
            var beginDate = new Date(response.appointmentBeginDate)
            beginDate.setHours(beginDate.getHours() + 2);
            var isoStr = beginDate.toISOString();
            document.getElementById('appointmentBeginDate').value = isoStr.substring(0,isoStr.length-1);
            document.getElementById('doctorComment').value = response.doctorComment;
            document.getElementById('appointmentStatus').selectedIndex = appointmentStatuses.indexOf(response.appointmentStatus);
            document.getElementById('paymentStatus').selectedIndex = paymentStatuses.indexOf(response.paymentStatus);
            document.getElementById('appointmentPrice').value = response.appointmentPrice;
            document.getElementById('patient').value = response.patient;
            document.getElementById('doctor').value = response.doctor;
        }
    };
    xmlhttp.send();

}

function saveAppointment() {

    // save the appointment
    var url = "http://localhost:8080/receptionist/appointment";

    var beginDate = new Date(document.getElementById('appointmentBeginDate').value);
    var endDate = new Date(beginDate);
    endDate.setHours(endDate.getHours() + 1);
    var beginDateStr = beginDate.toISOString();
    beginDateStr = beginDateStr.substring(0,beginDateStr.length-1);
    var endDateStr = endDate.toISOString();
    endDateStr = endDateStr.substring(0,endDateStr.length-1);


    var data = {
        doctorId: null,
        appointmentId: document.getElementById('appointmentId').value,
        appointmentStatus: document.getElementById('appointmentStatus').value,
        paymentStatus: document.getElementById('paymentStatus').value,
        doctorComment: null,
        patientId: null,
        appointmentBeginDate: beginDateStr,
        appointmentEndDate: endDateStr,
        appointmentPrice: null
    };
    var json = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if(response == 1){
                alert("Appointment Updated Succesfully1");
                window.location.href = "../html/appointmentsReceptionist.html";
            }
        }
    };
    xmlhttp.send(json);

}

