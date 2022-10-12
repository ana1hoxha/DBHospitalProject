create table Department
(id int not null primary key,
departmentName varchar(30),
totalDoctors int default 0,
activeAppointments int default 0);

create table Doctor
(id int not null primary key,
title varchar(30) ,
fullname varchar(30),
gender varchar(1),
depID int,
supervisorId int,
foreign key (depID) references Department (id)
on delete set null on update cascade,
foreign key (supervisorId) references Doctor (id)
on delete set null on update cascade);

create table Patient(
id int not null primary key,
insuranceId varchar(30),
fullname varchar(30),
birthday DATE,
gender varchar(1),
address varchar(30));

create table Appointment 
( id int not null primary key,
  appointmentDate DATE,
  doctorComment varchar(200),
  appointmentStatus varchar(30),
  paymentStatus varchar(30),
  patientId int,
  doctorId int, 
  appointmentPrice int,
  foreign key (doctorId) references Doctor (id)
  on delete set  null on update cascade,
  foreign key (patientId) references Patient (id)
  on delete set  null on update cascade);

create table Test(
id int not null primary key,
diagnosis varchar(30),
testDate DATE,
doctorId int,
patientId int,
testType varchar(30),
testPrice int,
foreign key (doctorId) references Doctor (id)
on delete set  null on update cascade,
foreign key (patientId) references Patient (id)
on delete set  null on update cascade);

create table login (
id int primary key not null,
passw varchar(30),
userRole varchar(30));

create table payment
(id int not null primary key,
patientId int,
appointmentId int,
testId int,
price int default 0,
paymentDate date,
foreign key (patientId) references Patient (id),
foreign key (appointmentId) references Appointment (id),
foreign key (testId) references Test (id)
);






























