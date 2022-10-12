
window.onload = function () {

    var doctorId = sessionStorage.getItem('doctorId');

    // get the doctor
    var url = "http://localhost:8080/patient/doctor/" + doctorId;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = JSON.parse(xmlhttp.responseText)
            console.log(response);
            document.getElementById('title').value = response.title;
            document.getElementById('fullname').value = response.fullname;
            document.getElementById('gender').value = response.gender;
            document.getElementById('departmentName').value = response.departmentName;
        }
    };
    xmlhttp.send();

}



