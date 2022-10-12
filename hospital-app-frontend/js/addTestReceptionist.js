

window.onload = function () {

    // get departments
    getDepartments();
    // get doctors for default department
    getDoctors();

}

function addTest() {

    // add the test
    var url = "http://localhost:8080/receptionist/test";

    var testDate = new Date(document.getElementById('testDate').value);
    var testDateStr = testDate.toISOString();
    testDateStr = testDateStr.substring(0,10);




    var data = {
        testDate: testDateStr,
        doctorId: document.getElementById('doctor').value,
        patientId: document.getElementById('patientId').value,
        diagnosis: null,
        testType: document.getElementById('testType').value,
        testPrice: document.getElementById('testPrice').value,
        testStatus: "CREATED",
        paymentStatus: "NOT PAID",
        testId: null
   
    };

    var json = JSON.stringify(data);
    // alert(json)

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if(response == 1){
                alert("Test Added Succesfully");
                window.location.href = "../html/testsReceptionist.html";
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

    var url = "http://localhost:8080/receptionist/department/" + document.getElementById('department').value +"/doctors";

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


/*  we dont have restrictions for the number of tests in a day
function getTestForDoctor() {

    var doctorId = document.getElementById('doctor').value;
    console.log(doctorId);

    // var url = "http://localhost:8080/receptionist/appointment";
    //
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST", url, false);
    // xmlhttp.setRequestHeader("Content-Type", "application/json");
    // xmlhttp.onreadystatechange = function () {
    //     if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    //         var response = JSON.parse(xmlhttp.responseText)
    //         for (const responseElement of response) {
    //             var option = document.createElement("option");
    //             option.text = responseElement.fullname;
    //             option.value = responseElement.id;
    //             selectDoctor.add(option);
    //         }
    //     }
    // };
    // xmlhttp.send();

}*/

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}

