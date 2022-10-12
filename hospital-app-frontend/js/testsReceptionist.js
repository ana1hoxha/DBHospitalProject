window.onload = function () {

    // get all tests
    var url = "http://localhost:8080/receptionist/tests";

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
    var table = document.getElementById("testsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var diagnosisCell = row.insertCell(1);
    var dateCell = row.insertCell(2);
    var doctorCell = row.insertCell(3);
    var patientCell = row.insertCell(4);
    var typeCell = row.insertCell(5);
    var priceCell = row.insertCell(6);
    var statusCell = row.insertCell(7);
    var actionsCell = row.insertCell(8);
    idCell.innerHTML = rowValues.id;
    diagnosisCell.innerHTML = rowValues.diagnosis;
    var testDate = new Date(rowValues.testDate);
    testDate.setHours(testDate.getHours() + 26);
    var isoStr = testDate.toISOString().substring(0,10);
    dateCell.innerHTML = isoStr;
    doctorCell.innerHTML = rowValues.doctor;
    patientCell.innerHTML = rowValues.patient;
    typeCell.innerHTML = rowValues.testType;
    priceCell.innerHTML = rowValues.testPrice;
    statusCell.innerHTML = rowValues.testStatus;
    actionsCell.innerHTML = "<button type=\"button\" class=\"btn btn-primary\" onclick=\"editTest(this)\"><i class=\"bi bi-pencil\"></i></button>\n";
    // "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteTest(this)\"><i class=\"bi bi-trash\"></i></button>";
}

function editTest(param) {
    var testId = param.parentElement.parentElement.cells[0].innerText;
    sessionStorage.setItem('testId', testId);
    window.location.href = "../html/editTestReceptionist.html";
}

function deleteTest(param) {
  var testId = param.parentElement.parentElement.cells[0].innerText;}

