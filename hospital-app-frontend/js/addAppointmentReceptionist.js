var appointmentHour;

var buttonIds = ['time1','time2','time3','time4','time5','time6'];

window.onload = function () {

    // get departments
    getDepartments();
    // get doctors for default department
    getDoctors();

}

function addAppointment() {

    // add the appointment
    var url = "http://localhost:8080/receptionist/appointment";

    // var beginDate = new Date(document.getElementById('appointmentBeginDate').value);
    // var endDate = new Date(beginDate);
    // endDate.setHours(endDate.getHours() + 1);
    // var beginDateStr = beginDate.toISOString();
    // beginDateStr = beginDateStr.substring(0, beginDateStr.length - 1);
    // var endDateStr = endDate.toISOString();
    // endDateStr = endDateStr.substring(0, endDateStr.length - 1);

    var beginDate = new Date(document.getElementById('appointmentBeginDate').value);
    beginDate.setHours(appointmentHour + 2); // + 2 is the zone problem
    var beginDateStr = beginDate.toISOString();
    beginDateStr = beginDateStr.substring(0, beginDateStr.length - 1);
    var endDate = new Date(beginDate);
    var endDateStr = endDate.toISOString();
    endDate.setHours(beginDate.getHours() + 1);
    endDateStr = endDateStr.substring(0, endDateStr.length - 1);

    var data = {
        doctorId: document.getElementById('doctor').value,
        appointmentId: null,
        appointmentStatus: "CREATED",
        paymentStatus: "NOT PAID",
        doctorComment: null,
        patientId: document.getElementById('patientId').value,
        appointmentBeginDate: beginDateStr,
        appointmentEndDate: endDateStr,
        appointmentPrice: document.getElementById('appointmentPrice').value
    };
    var json = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if (response == 1) {
                alert("Appointment Added Succesfully1");
                window.location.href = "../html/appointmentsReceptionist.html";
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

function getDoctors() {

    var selectDoctor = document.getElementById('doctor');
    removeOptions(selectDoctor);

    var url = "http://localhost:8080/receptionist/department/" + document.getElementById('department').value + "/doctors";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            for (const responseElement of response) {
                var option = document.createElement("option");
                option.text = responseElement.fullname;
                option.value = responseElement.id;
                selectDoctor.add(option);
            }
        }
    };
    xmlhttp.send();

}

function getAppointmentDatesForDoctor() {

    var doctorId = document.getElementById('doctor').value;
    console.log(doctorId);
    var beginDateStr = document.getElementById('appointmentBeginDate').value;

    var url = "http://localhost:8080/receptionist/doctor/" + doctorId + "/date/" + beginDateStr + "/appointments";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            for (const responseElement of response) {
                var date = new Date(responseElement.appointmentBeginDate);
                var hour = date.getHours();
                disableButton(hour);
            }
        }
    };
    xmlhttp.send();

}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}

function disableButton(hour) {
    var id = null;
    if(hour==9) id = 'time1'
    if(hour==10) id = 'time2'
    if(hour==11) id = 'time3'
    if(hour==13) id = 'time4'
    if(hour==14) id = 'time5'
    if(hour==15) id = 'time6'
    document.getElementById(id).disabled = true;
    document.getElementById(id).className = "btn btn-secondary";
}

function selectTime(timeSlot){
    if(timeSlot==1) appointmentHour = 9
    if(timeSlot==2) appointmentHour = 10
    if(timeSlot==3) appointmentHour = 11
    if(timeSlot==4) appointmentHour = 13
    if(timeSlot==5) appointmentHour = 14
    if(timeSlot==6) appointmentHour = 15
}

function enableButtons() {
    for (var i = 0; i < buttonIds.length; i++) {
        document.getElementById(buttonIds[i]).disabled = false;
        document.getElementById(buttonIds[i]).className = "btn btn-primary";
    }
}


