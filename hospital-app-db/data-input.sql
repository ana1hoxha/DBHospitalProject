-- set for the current session:
SET FOREIGN_KEY_CHECKS=0;

-- set globally:
SET GLOBAL FOREIGN_KEY_CHECKS=0;


INSERT into Department(id,departmentName,totalDoctors)
values (1, "Radiology",0),
(2,"Oncology",0),
(3,"Neurology",0),
(4,"Gynecology and Obstetrics",0),
(5,"Infectious Disease",0);

INSERT INTO DOCTOR(id, title,fullname, gender, depID, supervisorID)
values
(1,"senior","Radbruch","m",1,3),
(2,"senior","Bhatti","m",1,3),
(3,"HOD","Crofton","f",1,null),
(4,"junior","Junaid","m",1,3),
(5,"chief","Junaid","m",1,3),

(6,"HOD","Kiwit","m",2,null),
(7,"senior","Gross","m",2,6),
(8,"chief","Tsaroucha","f",2,6),
(9,"junior","Hofele","f",2,6),
(10,"senior","Halberstadt","m",2,6),
(11,"intern","Diemel","m",2,6),

(12,"HOD","Buhl","m",3,null),
(13,"senior","Becker","m",3,12),
(14,"senior","Schreiber","m",3,12),
(15,"junior","Meyding-Lamade","f",3,12),
(16,"intern","Kauffmann","f",3,12),

(17,"HOD","Untch","m",4,null),
(18,"senior","Lampe","m",4,17),
(19,"chief","Meisel","f",4,17),

(20,"HOD","Schmidt","m",5,null),
(21,"senior","Bender","m",5,20),
(22,"junior","Heise","m",5,20),
(23,"intern","Krauss","f",5,20),

(24,"medical director","Abdu","3",null,null);

------------------------------

insert into AppointmentStatus(id
,statusDescription) values 
(1,"CREATED"),
(2,"CANCELED BY DOCTOR"),
(3,"CANCELED BY PATIENT"),
(4,"POSTPONED"),
(5,"PATIENT NO-SHOWS"),
(6,"ATTENDED");

insert into TestType(id, typeDescription,price) values
(1,"Blood",18),
(2,"SST",140),
(3,"ECG",150),
(4,"CT Scan",1050),
(5,"Biochemical",30),
(6,"Tumor markers",245),
(7,"MRI",1250);


insert into Patient(id,insuranceId,fullname,
birthday,gender,address)
values
(1,"17G8H7BSBO","Anka Vantchev","1989-11-12","f","Luckenwalder Strasse 3,Apelern"),
(2,"VFH456RJ3O","Georgs Takenaka","1988-05-15","m","Lietzensee-Ufer 16,Köthen"),
(3,"3HGJ7DQB55","Imran Paris","1978-03-01","m","Rudower Strasse 64,Scheuern"),
(4,"356ZJJ2W68","Leo Langenberg","1993-08-17","m","Rosenstrasse 15,München"),
(5,"DV0LBV5YH4","Matija Sinagra","1957-12-15","m","Heinrich Heine Platz 91,Gotha");

insert into PaymentStatus(id,statusDescription) values 
(1,"PENDING"),
(2,"COMPLETED"),
(3,"REFUNDED"),
(4,"FAILED"),
(5,"ABANDONDED"),
(6,"CANCELLED");

insert into Appointment(id, appointmentDate,doctorComment,appointmentStatus,paymentStatus,patientId,doctorId,appointmentPrice)
values(101,"2022-02-28","comment","WAITING FOR PATIENT","PAYMENT WAITING",5,2,100);

insert into Login(id, passw, userRole) values
(1,"patient","PATIENT"),
(2,"receptionist","RECEPTIONIST"),
(3,"doctor","DOCTOR");