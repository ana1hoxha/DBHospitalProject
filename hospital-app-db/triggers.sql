
delimiter $$
drop trigger if exists updateTotalDoctors $$
create trigger updateTotalDoctors
after insert on doctor
for each row
begin
update Department
set totalDoctors = totalDoctors + 1
where department.id = new.depID;
end $$

delimiter $$
drop trigger if exists deleteTotalDoctors $$
create trigger deleteTotalDoctors
after delete on doctor
for each row
begin
update Department
set totalDoctors = totalDoctors - 1
where department.id = old.depID;
end $$

delimiter $$
drop trigger if exists updateActiveAppointments $$
create trigger updateActiveAppointments
after insert on appointment
for each row
begin
update Department
set activeAppointments = activeAppointments + 1
where id = (select depID from doctor where doctor.id = new.doctorId);
end $$

delimiter $$
drop trigger if exists nonactiveAppointments $$
create trigger nonactiveAppointments
after update on appointment
for each row
begin
if(STRCMP(new.appointmentStatus,'CANCELED BY DOCTOR') = 0) or
(STRCMP(new.appointmentStatus,'CANCELED BY PATIENT') = 0) then
UPDATE department 
set activeAppointments = activeAppointments - 1
where id = (select depID from doctor where doctor.id = new.doctorId);
END IF;
end $$


delimiter $$
drop trigger if exists insertPayment $$
create trigger insertPayment
after update on appointment
for each row
begin
if((STRCMP(new.paymentStatus,'PAID') = 0) and 
(STRCMP(old.paymentStatus,'PAID') != 0)) then
insert into payment(patientId,appointmentId,price,paymentDate) values
(new.patientId,new.id,new.appointmentPrice,CURDATE());
end if;
end $$

delimiter $$
drop trigger if exists insertPaymentTest $$
create trigger insertPaymentTest
after update on Test
for each row
begin
if((STRCMP(new.paymentStatus,'PAID') = 0) and 
(STRCMP(old.paymentStatus,'PAID') != 0)) then
insert into payment(patientId,testId,price,paymentDate) values
(new.patientId,new.id,new.testPrice,CURDATE());
end if;
end $$


delimiter $$
drop trigger if exists applyAppointmentDiscount $$
create trigger applyAppointmentDiscount
before insert on appointment
for each row
begin
declare countappt int default 0;
select count(appointment.id) from
 appointment  where patientId = new.patientId into countappt ;
 if countappt mod 3 = 2 then  #every 5th appt
set new.appointmentPrice = new.appointmentPrice * (4/5);
end if;
end $$














