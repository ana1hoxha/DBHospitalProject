select * from patient;

insert into patient ( insuranceId, fullname, birthday, gender, address)
values("","","","","");

update patient set insuranceId = "", fullname ="", birthday = "", gender = "",
address = "" where id = "";

delete from patient where id = "";

#doctors with respective supervisor and department
select A.id as id, A.title as title, A.fullname as fullname, A.gender as gender,  B.fullname as supervisor, departmentName as department
from doctor A inner join doctor B on A.supervisorId = B.id inner join department on A.depID = department.id;

#we can auto_increment the id , so we dont specify it
insert into doctor (title, fullname, gender, depId, supervisorId) values ("","","","","");

update doctor set title = "", fullname ="", gender ="", depId ="", supervisorId ="" where id = "";

select appointment.id, appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus , paymentStatus, patient.fullname as patient, 
doctor.fullname as doctor, appointmentPrice from appointment inner join patient on appointment.patientId = patient.id
inner join doctor on appointment.doctorId = doctor.id;

insert into appointment(appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus, paymentStatus, patientId, doctorId,
appointmentPrice) values ("","","","","","","","");

select departmentName from department where id = "";
select fullname, id from doctor where doctor.depId = "";

#this way the receptionist can write only the first char of patient's name
SELECT fullname FROM patient WHERE fullname REGEXP '^[A].*$';
SELECT fullname FROM patient WHERE fullname LIKE "G%";


SELECT doctor.fullname from doctor inner join appointment on doctor.id = appointment.doctorId 
 where appointmentBeginDate = curdate()  group by doctorId;

 #receptionist 
 update appointment set appointmentBeginDate = "" , appointmentEndDate = "" , appointmentStatus = "", paymentStatus = "", patientId = "", doctorId = "", appointmentPrice = ""
 where id = "";
------------------------------------------------------------------
 select test.id, diagnosis , testDate , doctor.fullname as doctor, patient.fullname as patient
 ,testType, testPrice, testStatus , paymentStatus from test
 inner join patient on patient.id = test.patientId inner join doctor on doctor.id = test.doctorId;

insert into test (testdate,diagnosis, doctorId, patientId, testType, testPrice , testStatus, paymentStatus)
values (?,?,?,?,?,?,?); 

update test set testdate = ?, doctorId = ? , patientId = ? , testType = ? , testPrice = ?,
testStatus =? , paymentStatus = ? where id = ?;
 
---------------------------------------------#
#shows all paid appointments and tests
select payment.id , patient.fullname as patient, appointmentId, testId, price, paymentDate from payment inner join patient on payment.patientId = patient.id;

#shows all not paid appointments
select appointment.id, appointmentBeginDate, appointmentEndDate, appointmentStatus , patient.fullname as patient, 
doctor.fullname as doctor, appointmentPrice from appointment inner join patient on appointment.patientId = patient.id
inner join doctor on appointment.doctorId = doctor.id where appointment.paymentStatus != "PAID";

#shows all not paid tests 
select test.id ,testDate,testType,testPrice,testStatus, patient.fullname as patient, doctor.fullname as doctor from test
inner join patient on patient.id = test.patientId inner join doctor on 
doctor.id = test.doctorId where test.paymentStatus != 'PAID';

#sum of all paid tests and appointments for the current month
select sum(price) as Total from payment where month(paymentdate) = month(curdate());


#sum all not paid appointmsnet and tests
#total of unpaid appointments
SELECT sum(appointmentPrice)  as 'Total' FROM appointment WHERE appointment.paymentStatus !="PAID";
#total of unpaid tests
SELECT sum(testPrice)  as 'Total' FROM test WHERE test.paymentStatus !="PAID";

select sum(appointmentPrice) as totalAppt , sum(testPrice) as totalTest , (sum(appointmentPrice) + sum(testPrice)) as result
from appointment inner join test on appointment.patientId = test.patientId where appointment.paymentStatus !="PAID" and test.paymentStatus != "PAID";


#appointment with doctorId and date
select appointmentBeginDate from appointment where doctorId=1 and day(appointmentBeginDate) = day('2022-07-28');

select A.id as id, A.title as title, A.fullname as fullname, A.gender as gender,  B.fullname as supervisor, departmentName
from doctor A inner join doctor B on A.supervisorId = B.id inner join department on A.depID = department.id where A.id = 6;
