#available doctors for each department
select doctor.id , title , fullname, gender, departmentName 
from doctor inner join department on doctor.depID = department.id;

select A.id as id, A.title as title, A.fullname as fullname, A.gender as gender,  B.fullname as supervisor
from doctor A, doctor B where A.supervisorId = B.id;

select A.id as id, A.title as title, A.fullname as fullname, A.gender as gender,  B.fullname as supervisor, departmentName
from doctor A inner join doctor B on A.supervisorId = B.id inner join department on A.depID = department.id;




#all appintments and test that got a discount from insurance
select  patient.fullname as PatientName , patient.insuranceId as Insurance  from
appointment inner join patient on appointment.patientId = patient.id inner join
test on patient.id = test.patientId;

with recursive supervisors (id, title, fullname, depID, supervisorId) as
(select id, title, fullname ,depID , supervisorId from doctor where supervisorId in
(select id from doctor) 
union all
(select doctor.id, doctor.title, doctor.fullname, doctor.depId, doctor.supervisorId  from doctor, supervisors 
where doctor.supervisorId = supervisors.id))

select title, fullname from supervisors where depId= 1;

