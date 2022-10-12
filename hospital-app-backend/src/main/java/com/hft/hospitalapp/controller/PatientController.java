package com.hft.hospitalapp.controller;

import com.hft.hospitalapp.entity.Payment;
import com.hft.hospitalapp.model.response.*;
import com.hft.hospitalapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private TestRepository testRepository;

    @GetMapping("/patient/{patientId}/appointments")
    public ResponseEntity<List<AppointmentForPatientResponse>> getAllAppointmentsForPatient(@PathVariable Integer patientId){
        return new ResponseEntity<>(patientRepository.findAllAppointments(patientId), HttpStatus.OK);
    }

    @GetMapping("/patient/{patientId}/tests")
    public ResponseEntity<List<TestForPatientResponse>> getAllTestsForPatient(@PathVariable Integer patientId){
        return new ResponseEntity<>(patientRepository.findAllTests(patientId), HttpStatus.OK);
    }

    @GetMapping("/patient/doctor/{doctorId}")
    public ResponseEntity<DoctorResponse> getDoctor(@PathVariable Integer doctorId){
        return new ResponseEntity<>(doctorRepository.findByIdForPatient(doctorId), HttpStatus.OK);
    }

    @GetMapping("/patient/{patientId}/payments")
    public ResponseEntity<List<Payment>> getPayments(@PathVariable int patientId){
        List<Payment> payments = paymentRepository.findByPatient(patientId);
        if(payments == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    @GetMapping("/patient/{patientId}/appointments/not-paid")
    public ResponseEntity<List<AppointmentPaymentResponse>> getNotPaidAppointments(@PathVariable int patientId){
        List<AppointmentPaymentResponse> allNotPaidAppointments = paymentRepository.findNotPaidAppointmentsByPatient(patientId);
        if(allNotPaidAppointments == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(allNotPaidAppointments, HttpStatus.OK);
    }

    @GetMapping("/patient/{patientId}/tests/not-paid")
    public ResponseEntity<List<TestPaymentResponse>> getNotPaidTests(@PathVariable int patientId){
        List<TestPaymentResponse> testPaymentResponses = paymentRepository.findNotPaidTestsByPatient(patientId);
        if(testPaymentResponses == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(testPaymentResponses, HttpStatus.OK);
    }

    @PutMapping("/patient/appointment/{appointmentId}/cancel")
    public ResponseEntity<Integer> cancelAppointment(@PathVariable int appointmentId){
        return new ResponseEntity<>(appointmentRepository.cancelAppointmentByPatient(appointmentId), HttpStatus.OK);
    }

    @PutMapping("/patient/test/{testId}/cancel")
    public ResponseEntity<Integer> cancelTest(@PathVariable int testId){
        return new ResponseEntity<>(testRepository.cancelTestByPatient(testId), HttpStatus.OK);
    }

}
