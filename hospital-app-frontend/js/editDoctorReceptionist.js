
genders = ["f","m"]

window.onload = function () {

    // get departments
    getDepartments();

    var doctorId = sessionStorage.getItem('doctorId');

    // get the doctor
    var url = "http://localhost:8080/receptionist/doctor/" + doctorId;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            document.getElementById('id').value = response.id;
            document.getElementById('title').value = response.title;
            document.getElementById('fullname').value = response.fullname;
            document.getElementById('gender').selectedIndex = genders.indexOf(response.gender);
            document.getElementById('department').selectedIndex = response.depID-1;
            document.getElementById('supervisorId').value = response.supervisorId;
        }
    };
    xmlhttp.send();

}

function saveDoctor() {

    // save the doctor
    var url = "http://localhost:8080/receptionist/doctor";

    var data = {
        id: document.getElementById('id').value,
        title: document.getElementById('title').value,
        fullname: document.getElementById('fullname').value,
        gender: document.getElementById('gender').value,
        depID: document.getElementById('department').value,
        supervisorId: document.getElementById('supervisorId').value
    };
    var json = JSON.stringify(data);


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            if(response == 1){
                alert("Doctor Updated Succesfully1");
                window.location.href = "../html/doctorsReceptionist.html";
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

