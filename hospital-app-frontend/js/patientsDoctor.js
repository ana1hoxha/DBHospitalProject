window.onload = function () {

    var userId = sessionStorage.getItem('userId');

    // get all patients
    var url = "http://localhost:8080/doctor/"+ userId +"/patients";

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
    var table = document.getElementById("patientsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var insuranceIdCell = row.insertCell(1);
    var fullnameCell = row.insertCell(2);
    var genderCell = row.insertCell(3);
    var birthdayCell = row.insertCell(4);
    var addressCell = row.insertCell(5);
    var detailsCell = row.insertCell(6);
    idCell.innerHTML = rowValues.id;
    insuranceIdCell.innerHTML = rowValues.insuranceId;
    fullnameCell.innerHTML = rowValues.fullname;
    genderCell.innerHTML = rowValues.gender;
    birthdayCell.innerHTML = rowValues.birthday;
    addressCell.innerHTML = rowValues.address;
    detailsCell.innerHTML = "<button type=\"button\" class=\"btn btn-primary\" onclick=\"openSinglePatient(this)\"><i class=\"bi bi-archive\"></i></button>";
}

function openSinglePatient(param){
    var patientId = param.parentElement.parentElement.cells[0].innerText;
    var patientName = param.parentElement.parentElement.cells[2].innerText;
    sessionStorage.setItem('patientId', patientId);
    sessionStorage.setItem('patientName', patientName);
    window.location.href = "../html/singlePatientPageDoctor.html";
}

