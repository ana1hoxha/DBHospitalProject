window.onload = function () {
    loadData();
//loadtest();
};


var actions = "";


actions += '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>';
actions += '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>';
actions += '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';

var dataDoc = "";

/*function loadtest(){
	
	var docTableRow;
	docTableRow = '<tr><td>';
	docTableRow += "101";
	docTableRow += '</td><td>';
	docTableRow += "docTitle";
	docTableRow += '</td><td>';
	docTableRow += "docName";
	docTableRow += '</td><td>';
	docTableRow += "docGender";
	docTableRow += '</td><td>';
	docTableRow += "docDep";
	docTableRow += '</td><td>';
	docTableRow += "docSupervisor";
	docTableRow += '</td><td>';
	docTableRow += actions + '</td></tr>';
	

	var myHtmlContent = docTableRow;
	var tableRef = document.getElementById('docTable').getElementsByTagName('tbody')[0];
	
	var newRow = tableRef.insertRow(tableRef.rows.length);
	newRow.innerHTML = myHtmlContent;
}*/

function loadData() {
    var url = "http://localhost:8080/doctors";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false)

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);

            if (response == null) {
                // handle
            }
            for (let index = 0; index < response.length; index++) {

                var doc_id = response[index].id;
                var docTitle = response[index].title;
                var docName = response[index].fullname;
                var docGender = response[index].gender;
                var docDep = response[index].departmentName;
                var docSupervisor = response[index].supervisor;

                var docTableRow;
                docTableRow = '<tr><td>';
                docTableRow += doc_id;
                docTableRow += '</td><td>';
                docTableRow += docTitle;
                docTableRow += '</td><td>';
                docTableRow += docName;
                docTableRow += '</td><td>';
                docTableRow += docGender;
                docTableRow += '</td><td>';
                docTableRow += docDep;
                docTableRow += '</td><td>';
                docTableRow += docSupervisor;
                docTableRow += '</td><td>';
                docTableRow += actions + '</td></tr>';

                var myHtmlContent = docTableRow;
                var tableRef = document.getElementById('docTable').getElementsByTagName('tbody')[0];

                var newRow = tableRef.insertRow(tableRef.rows.length);
                newRow.innerHTML = myHtmlContent;
            }
        }
        ;
    }
    xmlhttp.send();
}


$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // Append table with add row form on add new button click
    $(".add-new").click(function () {
        $(this).attr("disabled", "disabled");
        var index = $("table tbody tr:last-child").index();

        //var row contains the data i just added in the cell, this info should also be saved in db
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="id" id="id"></td>' +
            '<td><input type="text" class="form-control" name="title" id="title"></td>' +
            '<td><input type="text" class="form-control" name="name" id="name"></td>' +
            '<td><input type="text" class="form-control" name="gender" id="gender"></td>' +
            '<td><input type="text" class="form-control" name="department" id="department"></td>' +
            '<td><input type="text" class="form-control" name="supervisor" id="supervisor"></td>' +
            '<td>' + actions + '</td>' +
            '</tr>';
        $("table").append(row);
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
    // Add row on add button click
    $(document).on("click", ".add", function () {
        var empty = false;
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function () {
            if (!$(this).val()) {
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });


        $(this).parents("tr").find(".error").first().focus();

        if (!empty) {
            input.each(function () {
                alert("kjo eshte nga add " + $(this).val());
                dataDoc += $(this).val() + " ";
                $(this).parent("td").html($(this).val());
            });


            alert("kjo eshte cfare merr kur regjistorn " + dataDoc)

            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");


            var info = dataDoc.split(' ');

            var data = {
                id: info[0],
                title: info[1],
                name: info[2],
                gender: info[3],
                department: info[4],
                supervisor: info[5]
            };

            var json = JSON.stringify(data);
            alert(json);

            var url = "";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", url, false);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    alert("updated doc")
                }
            };
            xmlhttp.send(json);
        }
    });


    // Edit row on edit button click  //cannot edit the id
    $(document).on("click", ".edit", function () {
        //update data in db to be done
        $(this).parents("tr").find("td:not(:first-child):not(:last-child)").each(function () {

            dataDoc += $(this).text() + " ";
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');

        });


        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");


        var info = dataDoc.split(' ');

        var data = {
            id : $(this).parents("tr").find("td:eq(0)").text(),
            title: info[0],
            name: info[1],
            gender: info[2],
            department: info[3],
            supervisor: info[4]
        };

        console.log(data)

        var json = JSON.stringify(data);

        var url = "http://localhost:8080/doctor";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", url, false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                alert("updated doc")
            }
        };
        xmlhttp.send(json);
    });


    // Delete row on delete button click
    $(document).on("click", ".delete", function () {
        //here i need also to delete data on db
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");


        var url = "";

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url, false);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                // var response = JSON.parse(xmlhttp.responseText);
                alert("deleted doctor");
            }
        };
        xmlhttp.send();


    });

});

