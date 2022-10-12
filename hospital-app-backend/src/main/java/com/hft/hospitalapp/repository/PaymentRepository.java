package com.hft.hospitalapp.repository;

import com.hft.hospitalapp.entity.Payment;
import com.hft.hospitalapp.model.response.AppointmentPaymentResponse;
import com.hft.hospitalapp.model.response.PaymentForReceptionistResponse;
import com.hft.hospitalapp.model.response.TestPaymentResponse;

import java.util.List;

public interface PaymentRepository {

    List<PaymentForReceptionistResponse> findAll();

    List<Payment> findByPatient(int patientId);

    List<AppointmentPaymentResponse> findAllNotPaidAppointments();

    List<TestPaymentResponse> findAllNotPaidTests();

    List<AppointmentPaymentResponse> findNotPaidAppointmentsByPatient(int patientId);

    List<TestPaymentResponse> findNotPaidTestsByPatient(int patientId);


}
