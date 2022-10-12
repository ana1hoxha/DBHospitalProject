#shows appointments of the patient, including doctor name and department name
select appointment.id, appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus, paymentStatus, doctor.fullname as doctorName, doctorId, appointmentPrice, 
department.departmentName as department  from appointment inner join doctor on appointment.doctorId = doctor.id  inner join department on doctor.depID = department.id
 where appointment.patientId = "3";
 
 SELECT doctor.id AS id , title, fullname, gender, department.departmentName AS departmentName FROM doctor
 INNER JOIN department ON doctor.depID = department.id WHERE doctor.id = 2;
 
 
#all tests of a patient with doctor and department
select test.id, diagnosis, testDate, doctor.fullname, testType, testPrice, testStatus, paymentStatus, department.departmentName from test inner
join doctor on test.doctorId = doctor.id inner join department on doctor.depID = department.id  where test.patientId = "5";
 
---------------------------------
#unpaid appointments
select appointment.id, appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus, paymentStatus, doctor.fullname as doctorName, doctorId, appointmentPrice, 
department.departmentName as department  from appointment inner join doctor on appointment.doctorId = doctor.id  inner join department on doctor.depID = department.id
 where appointment.patientId = "3" and paymentStatus != "PAID";

#unpaid tests
select test.id ,testDate,testType,testPrice,testStatus from test where patientId = 5 and paymentStatus != "PAID";

#paid appointments and tests
select payment.id , appointmentId, testId , price , paymentdate from payment where patientId = 1;
#total of paid appt and test
select sum(price) as Total from payment where patientId = 5;

#TOTAL OF UNPAID APPOINTMENTS AND TEST seperately
select sum(appointmentPrice)  as 'Total' 
from appointment where appointment.paymentStatus !="PAID" 
and appointment.patientId = 2;

select sum(testPrice)  as 'Total' 
from test where test.paymentStatus !="PAID" 
and test.patientId = 2;






