package com.hft.hospitalapp.repository.impl;

import com.hft.hospitalapp.entity.Payment;
import com.hft.hospitalapp.model.request.ReceptionistTestUpdateRequest;
import com.hft.hospitalapp.model.response.AppointmentPaymentResponse;
import com.hft.hospitalapp.model.response.PaymentForReceptionistResponse;
import com.hft.hospitalapp.model.response.TestForReceptionistResponse;
import com.hft.hospitalapp.model.response.TestPaymentResponse;
import com.hft.hospitalapp.repository.PaymentRepository;
import com.hft.hospitalapp.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PaymentRepositoryImpl implements PaymentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<PaymentForReceptionistResponse> findAll() {
        String query = "select payment.id , patient.fullname, appointmentId, testId, price, paymentDate from payment inner join patient on payment.patientId = patient.id";
        return jdbcTemplate.query(query,BeanPropertyRowMapper.newInstance(PaymentForReceptionistResponse.class));
    }

    @Override
    public List<Payment> findByPatient(int patientId) {
        String query = "select payment.id , appointmentId, testId , price , paymentdate from payment where patientId = ?";
        return jdbcTemplate.query(query,ps -> ps.setInt(1,patientId),BeanPropertyRowMapper.newInstance(Payment.class));
    }

    @Override
    public List<AppointmentPaymentResponse> findAllNotPaidAppointments() {
        String query = "select appointment.id, appointmentBeginDate, appointmentEndDate, appointmentStatus , patient.fullname as patient," +
                " doctor.fullname as doctor, appointmentPrice from appointment inner join patient on appointment.patientId = patient.id" +
                " inner join doctor on appointment.doctorId = doctor.id where appointment.paymentStatus != 'PAID'";
        return jdbcTemplate.query(query,BeanPropertyRowMapper.newInstance(AppointmentPaymentResponse.class));
    }

    @Override
    public List<TestPaymentResponse> findAllNotPaidTests() {
        String query = "select test.id ,testDate,testType,testPrice,testStatus, patient.fullname as patient, doctor.fullname as doctor from test" +
                " inner join patient on patient.id = test.patientId inner join doctor on" +
                " doctor.id = test.doctorId where test.paymentStatus != 'PAID'";
        return jdbcTemplate.query(query,BeanPropertyRowMapper.newInstance(TestPaymentResponse.class));
    }

    @Override
    public List<AppointmentPaymentResponse> findNotPaidAppointmentsByPatient(int patientId) {
        String query = "select appointment.id, appointmentBeginDate, appointmentEndDate, appointmentStatus , patient.fullname as patient," +
                " doctor.fullname as doctor, appointmentPrice from appointment inner join patient on appointment.patientId = patient.id" +
                " inner join doctor on appointment.doctorId = doctor.id where appointment.patientId = ? and appointment.paymentStatus != 'PAID'";
        return jdbcTemplate.query(query,ps -> ps.setInt(1,patientId) ,BeanPropertyRowMapper.newInstance(AppointmentPaymentResponse.class));
    }

    @Override
    public List<TestPaymentResponse> findNotPaidTestsByPatient(int patientId) {
        String query = "select test.id ,testDate,testType,testPrice,testStatus from test where patientId = ? and paymentStatus != 'PAID'";
        return jdbcTemplate.query(query, ps -> ps.setInt(1,patientId),BeanPropertyRowMapper.newInstance(TestPaymentResponse.class));
    }
}
