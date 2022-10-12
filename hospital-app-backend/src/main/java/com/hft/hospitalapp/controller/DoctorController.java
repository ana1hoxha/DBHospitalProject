package com.hft.hospitalapp.controller;

import com.hft.hospitalapp.model.request.DoctorAppointmentUpdateRequest;
import com.hft.hospitalapp.model.request.DoctorTestUpdateRequest;
import com.hft.hospitalapp.model.response.*;
import com.hft.hospitalapp.repository.AppointmentRepository;
import com.hft.hospitalapp.repository.DoctorRepository;
import com.hft.hospitalapp.repository.TestRepository;
import com.hft.hospitalapp.repository.impl.AppointmentRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DoctorController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private TestRepository testRepository;

    @GetMapping("/doctor/{doctorId}/appointments")
    public ResponseEntity<List<AppointmentDoctorResponse>> getAllAppointmentsForDoctor(@PathVariable Integer doctorId){
        return new ResponseEntity<>(appointmentRepository.findAll(doctorId) ,HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}/appointments/today")
    public ResponseEntity<List<AppointmentDoctorResponse>> getAllAppointmentsForDoctorToday(@PathVariable Integer doctorId){
        return new ResponseEntity<>(appointmentRepository.findAllToday(doctorId) ,HttpStatus.OK);
    }

    @PutMapping("/doctor/appointment")
    public ResponseEntity<Integer> updateAppointment(@RequestBody DoctorAppointmentUpdateRequest request){
        return new ResponseEntity<>(appointmentRepository.updateAppointmentForDoctor(request) ,HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}/tests")
    public ResponseEntity<List<TestDoctorResponse>> getAllTestsForDoctor(@PathVariable Integer doctorId){
        return new ResponseEntity<>(testRepository.findAll(doctorId) ,HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}/tests/today")
    public ResponseEntity<List<TestDoctorResponse>> getAllTestsForDoctorToday(@PathVariable Integer doctorId){
        return new ResponseEntity<>(testRepository.findAllToday(doctorId) ,HttpStatus.OK);
    }

    @PutMapping("/doctor/test")
    public ResponseEntity<Integer> updateTest(@RequestBody DoctorTestUpdateRequest request){
        return new ResponseEntity<>(testRepository.updateTestForDoctor(request) ,HttpStatus.OK);
    }



    @GetMapping("/doctor/{doctorId}/patients")
    public ResponseEntity<List<PatientForDoctorResponse>> getAllPatients(@PathVariable Integer doctorId){
        return new ResponseEntity<>(doctorRepository.findAllPatients(doctorId) ,HttpStatus.OK);
    }

    @GetMapping("/doctor/patients/{patientId}/appointments")
    public ResponseEntity<List<AppointmentHistoryDoctorResponse>> getAllAppointmentsForPatient(@PathVariable Integer patientId){
        return new ResponseEntity<>(doctorRepository.findAllAppointments(patientId) ,HttpStatus.OK);
    }

    @GetMapping("/doctor/patients/{patientId}/tests")
    public ResponseEntity<List<TestHistoryDoctorResponse>> getAllTestsForPatient(@PathVariable Integer patientId){
        return new ResponseEntity<>(doctorRepository.findAllTests(patientId) ,HttpStatus.OK);
    }

}
