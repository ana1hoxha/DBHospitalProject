
var testStatuses = ["CREATED", "CANCELLED BY PATIENT", "CANCELLED BY DOCTOR", "ATTENDED", "PATIENT NOT  SHOWED UP"];
var paymentStatuses = ["NOT PAID", "PAID"];
var testTypes = ["Blood","SST","ECG","CT Scan","Biochemical","Tumor markers","MRI"];


window.onload = function () {

    var testId = sessionStorage.getItem('testId');

    // get the  test
    var url = "http://localhost:8080/receptionist/tests/" + testId;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            document.getElementById('testId').value = response.id;
            var testDate = new Date(response.testDate)
            testDate.setHours(testDate.getHours() + 24);
            var isoStr = testDate.toISOString();
            alert(isoStr);
            document.getElementById('testDate').value = isoStr.substring(0,10);
            document.getElementById('diagnosis').value = response.diagnosis;
            document.getElementById('testStatus').selectedIndex = testStatuses.indexOf(response.testStatus);
            document.getElementById('paymentStatus').selectedIndex = paymentStatuses.indexOf(response.paymentStatus);
            document.getElementById('testPrice').value = response.testPrice;
            document.getElementById('patient').value = response.patient;
            document.getElementById('doctor').value = response.doctor;
            document.getElementById('testType').selectedIndex = testTypes.indexOf(response.testType);
        }
    };
    xmlhttp.send();

}

function saveTest() {

    // save the test
    var url = "http://localhost:8080/doctor/test";

    var userId = sessionStorage.getItem('userId');

    var data = {
        doctorId: userId,
        testId: document.getElementById('testId').value,
        diagnosis: document.getElementById('diagnosis').value,
        testType: document.getElementById('testType').value,
        testStatus: document.getElementById('testStatus').value
    };
    var json = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if(response == 1){
                alert("Test Updated Succesfully1");
                window.location.href = "../html/homeDoctor.html";
            }
        }
    };
    xmlhttp.send(json);

}

