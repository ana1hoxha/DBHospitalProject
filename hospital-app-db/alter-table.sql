alter table department
add column activeAppointments int;

update appointment set appointmentStatus = "DONE" where id = 101;