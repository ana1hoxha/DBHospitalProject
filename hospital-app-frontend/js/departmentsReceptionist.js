window.onload = function () {

    // get all departments
    var url = "http://localhost:8080/receptionist/departments";

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
    var table = document.getElementById("departmentsTable");
    var row = table.insertRow(index);
    var idCell = row.insertCell(0);
    var departmentNameCell = row.insertCell(1);
    var totalDoctorsCell = row.insertCell(2);
    var activeAppointmentsCell = row.insertCell(3);
    idCell.innerHTML = rowValues.id;
    departmentNameCell.innerHTML = rowValues.departmentName;
    totalDoctorsCell.innerHTML = rowValues.totalDoctors;
    activeAppointmentsCell.innerHTML = rowValues.activeAppointments;
}

function deleteDepartment(param) {
    var departmentId = param.parentElement.parentElement.cells[0].innerText;
}

