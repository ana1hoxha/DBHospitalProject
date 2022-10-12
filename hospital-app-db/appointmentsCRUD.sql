#appointmentHistoryDoctorPage
#all appointments in a table

select appointment.id, appointmentBeginDate, appointmentEndDate, appointmentStatus, doctorComment, patient.fullname, patient.id as patientId
 from appointment inner join patient on appointment.patientId = patient.id where doctorId = 2;
 
select test.id, diagnosis, patient.fullname as patient, testType, testStatus from test inner join patient  on test.patientId = patient.id where test.doctorId = 2;
 
SELECT test.id, diagnosis, patient.fullname as patient, testType, testStatus FROM test, patient WHERE test.patientId = patient.id
AND date_format(testDate, '%y-%m-%d') = curdate() AND doctorId = 2;
 
 #todaysAppointmentPage
SELECT appointment.id, appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus, patient.fullname , patient.id as patientId
    FROM appointment,  patient
    WHERE appointment.patientId = patient.id
    AND date_format(appointmentBeginDate, '%y-%m-%d') = curdate() AND doctorId = 2;

#updating an appointment from doctor
    Update appointment set  appointmentStatus = "", doctorComment = "" where appointment.id  = "" and appointment.doctorId = "";
    
#shows Patient details for doctor
select patient.id, insuranceId, fullname, birthday, gender, address 
from patient inner join appointment on appointment.patientId = patient.id
 where appointment.doctorId = 7 group by appointment.patientId;

#filtering by name or id
select * from patient where id = "5";
select * from patient where fullname = " ";


#appointmentHistory of a specific patient
select appointment.id, appointmentBeginDate, appointmentEndDate, appointmentStatus, doctorComment from appointment where patientId = "4";



#testsHIstory for a specific patient
select id, diagnosis, testDate, testType, testPrice, testStatus, paymentStatus
from test where patientId = "5";



 
 
 
 