select passw from login where id = 1;

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
drop trigger if exists insertPayment $$
create trigger insertPayment
after update on appointment
for each row
begin
if(STRCMP(new.appointmentStatus,'DONE') = 0) then
insert into payment(id,patientId,appointmentId,price,paymentDate) values
(1,new.patientId,new.id,new.appointmentPrice,CURDATE());
end if;
end $$


set @output = STRCMP(new.appointmentStatus,'NOTDONE');
select @output;











