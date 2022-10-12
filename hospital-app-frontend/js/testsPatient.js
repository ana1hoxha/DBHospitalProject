window.onload = function () {

    var userId = sessionStorage.getItem('userId');

    // get all tests
    var url = "http://localhost:8080/patient/" + userId +"/tests";

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
    var typeCell = row.insertCell(3);
    var departmentCell = row.insertCell(4);
    var priceCell = row.insertCell(5);
    var testStatusCell = row.insertCell(6);
    var paymentStatusCell = row.insertCell(7);
    var actionsCell = row.insertCell(8);
    idCell.innerHTML = rowValues.id;
    diagnosisCell.innerHTML = rowValues.diagnosis;
    var testDate = new Date(rowValues.testDate);
    testDate.setHours(testDate.getHours() + 26);
    var isoStr = testDate.toISOString().substring(0,10);
    dateCell.innerHTML = isoStr;
    departmentCell.innerHTML = rowValues.departmentName;
    typeCell.innerHTML = rowValues.testType;
    priceCell.innerHTML = rowValues.testPrice;
    testStatusCell.innerHTML = rowValues.testStatus;
    paymentStatusCell.innerHTML = rowValues.paymentStatus;
    actionsCell.innerHTML = "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteTest(this)\"><i class=\"bi bi-trash\"></i></button>";
}

function deleteTest(param) {
    var testId = param.parentElement.parentElement.cells[0].innerText;


    var url = "http://localhost:8080/patient/test/" + testId + "/cancel";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            alert("Test Cancelled")
        }
    };
    xmlhttp.send();
    window.location.href = "testsPatient.html";
}

