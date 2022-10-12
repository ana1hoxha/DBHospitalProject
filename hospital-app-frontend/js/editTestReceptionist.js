
var testStatuses = ["CREATED", "CANCELLED BY PATIENT", "CANCELLED BY DOCTOR", "ATTENDED", "PATIENT NOT  SHOWED UP"];
var paymentStatuses = ["NOT PAID", "PAID"];
var testTypes = ["Blood","SST","ECG","CT Scan","Biochemical","Tumor markers","MRI"];

window.onload = function () {

    var testId = sessionStorage.getItem('testId');

    // get the test
    var url = "http://localhost:8080/receptionist/tests/" + testId;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
           console.log(response);
            document.getElementById('testId').value = response.id;
            document.getElementById('diagnosis').value = response.diagnosis;
            document.getElementById('doctor').value = response.doctor;
            document.getElementById('patient').value = response.patient;
            var testDate = new Date(response.testDate);
            testDate.setHours(testDate.getHours + 26);
            var isoStr = testDate.toISOString();
            document.getElementById('testDate').value = isoStr.substring(0, 10);
            document.getElementById('testType').selectedIndex = testTypes.indexOf(response.testType);
            document.getElementById('testPrice').value = response.testPrice;
            document.getElementById('testStatus').selectedIndex = testStatuses.indexOf(response.testStatus);
            document.getElementById('paymentStatus').selectedIndex = paymentStatuses.indexOf(response.paymentStatus);
            
           
        }
    };
    xmlhttp.send();

}

function saveTest() {

    // save the test
    var url = "http://localhost:8080/receptionist/test";

    var testDate = new Date(document.getElementById('testDate').value);
    var testDateStr = testDate.toISOString();
    testDateStr = testDateStr.substring(0,10);

    var data = {
        testDate: testDateStr,
        doctorId: null,
        patientId: null,
        diagnosis: null,
        testType: document.getElementById('testType').value,
        testPrice: document.getElementById('testPrice').value,
        testStatus: document.getElementById('testStatus').value,
        paymentStatus: document.getElementById('paymentStatus').value,
        testId: document.getElementById('testId').value
      
    };
    
    var json = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if(response == 1){
                alert("Test Updated Succesfully");
                window.location.href = "../html/testsReceptionist.html";
            }
        }
    };
    xmlhttp.send(json);

}
