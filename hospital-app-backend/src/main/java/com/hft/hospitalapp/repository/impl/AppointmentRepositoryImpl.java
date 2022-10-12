package com.hft.hospitalapp.repository.impl;

import com.hft.hospitalapp.model.request.DoctorAppointmentUpdateRequest;
import com.hft.hospitalapp.model.request.ReceptionistAppointmentUpdateRequest;
import com.hft.hospitalapp.model.response.AppointmentDateForReceptionistResponse;
import com.hft.hospitalapp.model.response.AppointmentDoctorResponse;
import com.hft.hospitalapp.model.response.AppointmentForReceptionistResponse;
import com.hft.hospitalapp.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Repository
public class AppointmentRepositoryImpl implements AppointmentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<AppointmentDoctorResponse> findAll(Integer doctorId) {
        String query = "select appointment.id, appointmentBeginDate, appointmentEndDate, appointmentStatus, doctorComment, patient.fullname, patient.id as patientId" +
                " from appointment inner join patient  on appointment.patientId = patient.id where appointment.doctorId = ?";
        return jdbcTemplate.query(query , (ps) -> ps.setString(1, String.valueOf(doctorId)), BeanPropertyRowMapper.newInstance(AppointmentDoctorResponse.class));
    }

    @Override
    public List<AppointmentDoctorResponse> findAllToday(Integer doctorId) {
        String query = "SELECT appointment.id, appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus, patient.fullname , patient.id as patientId" +
                " FROM appointment,  patient" +
                " WHERE appointment.patientId = patient.id" +
                " AND date_format(appointmentBeginDate, '%y-%m-%d') = curdate()" +
                " AND doctorId = ?";
        return jdbcTemplate.query(query , (ps) -> ps.setString(1, String.valueOf(doctorId)), BeanPropertyRowMapper.newInstance(AppointmentDoctorResponse.class));
    }

    @Override
    public Integer updateAppointmentForDoctor(DoctorAppointmentUpdateRequest request) {
        String query = "Update appointment set  appointmentStatus = ?, doctorComment = ? where appointment.id  = ? and appointment.doctorId = ?";
        return jdbcTemplate.update(query,request.getAppointmentStatus(),request.getDoctorComment(), request.getAppointmentId(), request.getDoctorId());
    }

    @Override
    public Integer updateAppointmentForReceptionist(ReceptionistAppointmentUpdateRequest request) {
        String query = "update appointment set appointmentBeginDate = ? , appointmentEndDate = ? , appointmentStatus = ?, paymentStatus = ?" +
                " where id = ?";
        return jdbcTemplate.update(query,request.getAppointmentBeginDate(),request.getAppointmentEndDate(), request.getAppointmentStatus(),
                request.getPaymentStatus(), request.getAppointmentId());
    }

    @Override
    public Integer cancelAppointmentByPatient(int appointmentId) {
        String query = "update appointment set appointmentStatus = 'CANCELLED BY PATIENT' where id = ?";
        return jdbcTemplate.update(query,appointmentId);
    }

    @Override
    public List<AppointmentForReceptionistResponse> getAllAppointmentsForReceptionist() {
        return jdbcTemplate.query("select appointment.id, appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus , paymentStatus, patient.fullname as patient," +
                " doctor.fullname as doctor, appointmentPrice from appointment inner join patient on appointment.patientId = patient.id" +
                " inner join doctor on appointment.doctorId = doctor.id", BeanPropertyRowMapper.newInstance(AppointmentForReceptionistResponse.class));
    }

    @Override
    public List<AppointmentDateForReceptionistResponse> getAppointmentDatesWithDoctorAndDateForReceptionist(int doctorId, String appointmentBeginDate) {
        String query = "select appointmentBeginDate from appointment where doctorId=? and day(appointmentBeginDate) = day(?)";
        return jdbcTemplate.query(query, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps) throws SQLException {
                ps.setInt(1,doctorId);
                ps.setString(2,appointmentBeginDate);
            }
        }, BeanPropertyRowMapper.newInstance(AppointmentDateForReceptionistResponse.class));
    }


    @Override
    public Integer save(ReceptionistAppointmentUpdateRequest request) {
        String query = "insert into appointment(appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus, paymentStatus, patientId, doctorId," +
                " appointmentPrice) values (?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(query,request.getAppointmentBeginDate(),request.getAppointmentEndDate(), request.getDoctorComment(), request.getAppointmentStatus(),
                request.getPaymentStatus(), request.getPatientId(), request.getDoctorId(), request.getAppointmentPrice());
    }

    @Override
    public AppointmentForReceptionistResponse getAppointment(int appointmentId) {
        String query = "select appointment.id, appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus , paymentStatus, patient.fullname as patient," +
                " doctor.fullname as doctor, appointmentPrice from appointment inner join patient on appointment.patientId = patient.id" +
                " inner join doctor on appointment.doctorId = doctor.id where appointment.id = ?";
        return jdbcTemplate.query(query, ps -> ps.setInt(1, appointmentId), BeanPropertyRowMapper.newInstance(AppointmentForReceptionistResponse.class)).get(0);
    }

}
