-- set for the current session:
SET FOREIGN_KEY_CHECKS=1;

-- set globally:
SET GLOBAL FOREIGN_KEY_CHECKS=1;

-- set for the current session:
SET FOREIGN_KEY_CHECKS=0;

-- set globally:
SET GLOBAL FOREIGN_KEY_CHECKS=0;

INSERT into Department(departmentName)
values ("Radiology"),
("Oncology"),
("Neurology"),
("Gynecology and Obstetrics"),
("Infectious Disease");


INSERT INTO DOCTOR(title,fullname, gender, depID, supervisorId)
values
("senior","Radbruch","m",1,3),
("senior","Bhatti","m",1,3),
("HOD","Crofton","f",1,null),
("junior","Junaid","m",1,3),
("chief","Johan","m",1,3),

("HOD","Kiwit","m",2,null),
("senior","Gross","m",2,6),
("chief","Tsaroucha","f",2,6),
("junior","Hofele","f",2,6),
("senior","Halberstadt","m",2,6),
("intern","Diemel","m",2,6),

("HOD","Buhl","m",3,null),
("senior","Becker","m",3,12),
("senior","Schreiber","m",3,12),
("junior","Meyding-Lamade","f",3,12),
("intern","Kauffmann","f",3,12),

("HOD","Untch","m",4,null),
("senior","Lampe","m",4,17),
("chief","Meisel","f",4,17),

("HOD","Schmidt","m",5,null),
("senior","Bender","m",5,20),
("junior","Heise","m",5,20),
("intern","Krauss","f",5,20);



insert into Patient(insuranceId,fullname,birthday,gender,address)
values
("17G8H7BSBO","Anka Vantchev","1989-11-12","f","Luckenwalder Strasse 3,Apelern"),
("VFH456RJ3O","Georgs Takenaka","1988-05-15","m","Lietzensee-Ufer 16,Köthen"),
("3HGJ7DQB55","Imran Paris","1978-03-01","m","Rudower Strasse 64,Scheuern"),
("356ZJJ2W68","Leo Langenberg","1993-08-17","m","Rosenstrasse 15,München"),
("DV0LBV5YH4","Matija Sinagra","1957-12-15","m","Heinrich Heine Platz 91,Gotha"),
("JF0RFSGF6H","Rosalba Behar","1983-10-26","f","Kurfürstendamm 12, Allershagen"),
("WZ3Q0N0Y0Z","Ramesha Kym","1997-05-11","f","Eschenweg 51, Pößneck");


insert into Appointment(appointmentBeginDate,appointmentEndDate,doctorComment,appointmentStatus,paymentStatus,patientId,doctorId,appointmentPrice)
values("2022-02-28 10:00:00","2022-02-28 11:00:00","Seasonal flu","CREATED","NOT PAID",4,2,100),
("2022-05-29 10:00:00","2022-05-29 11:00:00","No Comment","CREATED","NOT PAID",3,5,115),
("2022-03-25 11:00:00","2022-03-25 12:00:00","On prescriptions","CREATED","NOT PAID",1,7,98),
("2022-05-15 13:00:00","2022-05-15 14:00:00","New prescription","CREATED","NOT PAID",1,7,85),
("2022-03-22 14:00:00","2022-03-22 15:00:00","First appointment","CREATED","NOT PAID",1,19,98),
("2022-05-19 13:00:00","2022-05-19 14:00:00","Second appointment","CREATED","NOT PAID",1,19,85),
("2022-06-06 15:00:00","2022-06-06 16:00:00","Obtain medical history","CREATED","NOT PAID",4,2,25),
("2022-04-25 10:00:00","2022-04-25 11:00:00","Monthly Check","CREATED","NOT PAID",3,5,30),
("2021-04-03 12:00:00","2021-04-03 13:00:00","First appointment","ATTENDED","PAID",6,2,100),
("2021-05-03 11:00:00","2021-05-03 12:00:00","Second appointment","ATTENDED","PAID",6,2,100),
("2021-06-10 14:00:00","2021-06-10 15:00:00","Third appointment","CREATED","NOT PAID",6,2,50),
("2022-01-20 10:00:00","2022-01-20 11:00:00","Recheck","CREATED","NOT PAID",6,2,50),
("2022-05-23 10:00:00","2022-05-23 11:00:00","New description","ATTENDED","PAID",6,10,100),
("2022-06-10 15:00:00","2022-06-10 16:00:00","New Medications","CANCELLED BY PATIENT","NOT PAID",6,10,100),
("2021-07-14 10:00:00","2021-07-14 11:00:00","Change prescriotion","ATTENDED","PAID",7,15,85),
("2021-08-15 12:00:00","2021-08-15 13:00:00","Monthly check","CREATED","NOT PAID",7,15,85),
("2022-01-18 13:00:00","2022-01-18 14:00:00","New prescription","CREATED","NOT PAID",7,2,75),
("2021-02-18 13:00:00","2021-02-18 14:00:00","Medications update","ATTENDED","PAID",7,2,75);


insert into test(diagnosis,testDate,doctorId,patientId,testType,testPrice,testStatus,paymentStatus)
values
("bone abnormalities","2022-06-07",2,1,"MRI",1250, "CREATED" ,"NOT PAID"),
("cholesterol levels","2022-02-16",23,1,"Biochemical",140, "CREATED" ,"NOT PAID"),
("heart attack","2021-06-02",2,1,"ECG",150, "PATIENT NOT SHOWED UP" ,"NOT PAID"),
("anemia","2022-02-28",2,5,"Blood",35, "ATTENDED" ,"NOT PAID"),
("arrhythmia","2022-02-15",1,5,"ECG",140, "ATTENDED" ,"NOT PAID"),
("syphilis","2022-05-20",18,2,"SST",120, "PATIENT NOT SHOWED UP" ,"NOT PAID"),
("cholesterol levels","2021-04-20",22,7,"Biochemical",275, "PATIENT NOT SHOWED UP" ,"NOT PAID"),
("breast cancer","2020-08-18",2,7,"Tumor markers",450, "Attended" ,"PAID"),
("anemia","2021-03-10",23,7,"Blood",30, "CREATED" ,"NOT PAID"),
("muscle disorders","2022-02-14",4,6,"CT Scan",250, "ATTENDED" ,"PAID"),
("diabetes","2022-03-08",21,6,"BLOOD",85, "PATIENT NOT SHOWED UP" ,"NOT PAID"),
("hiv virus","2022-05-06",18,6,"SST",150, "CANCELLED BY PATIENT" ,"NOT PAID");


insert into Login( passw, userRole) values
("patient","PATIENT"),
("doctor","DOCTOR"),
("receptionist","RECEPTIONIST");
