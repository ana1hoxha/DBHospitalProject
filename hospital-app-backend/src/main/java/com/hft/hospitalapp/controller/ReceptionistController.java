package com.hft.hospitalapp.controller;

import com.hft.hospitalapp.entity.Department;
import com.hft.hospitalapp.entity.Doctor;
import com.hft.hospitalapp.entity.Patient;
import com.hft.hospitalapp.entity.Payment;
import com.hft.hospitalapp.model.request.ReceptionistAppointmentUpdateRequest;
import com.hft.hospitalapp.model.request.ReceptionistTestUpdateRequest;
import com.hft.hospitalapp.model.response.*;
import com.hft.hospitalapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ReceptionistController {

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private TestRepository testRepository;
    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping("/receptionist/departments")
    public ResponseEntity<List<Department>> getAllDepartments(){
        List<Department> departments = departmentRepository.findAll();
        if(departments.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    @GetMapping("/receptionist/patients")
    public ResponseEntity<List<Patient>> getAllPatients(){
        List<Patient> patients = patientRepository.findAll();
        if(patients.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/receptionist/doctors")
    public ResponseEntity<List<DoctorResponse>> getAllDoctors(){
        List<DoctorResponse> doctors = doctorRepository.findAll();
        if(doctors.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @GetMapping("/receptionist/appointments")
    public ResponseEntity<List<AppointmentForReceptionistResponse>> getAllAppointments(){
        List<AppointmentForReceptionistResponse> appointments = appointmentRepository.getAllAppointmentsForReceptionist();
        if(appointments.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    @GetMapping("/receptionist/appointments/{appointmentId}")
    public ResponseEntity<AppointmentForReceptionistResponse> getAppointment(@PathVariable int appointmentId){
        AppointmentForReceptionistResponse appointment = appointmentRepository.getAppointment(appointmentId);
        if (appointment == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @GetMapping("/receptionist/tests")
    public ResponseEntity<List<TestForReceptionistResponse>> getAllTests(){
        List<TestForReceptionistResponse> tests = testRepository.getAllTestsForReceptionist();
        if(tests.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }

    @GetMapping("/receptionist/tests/{testId}")
    public ResponseEntity<TestForReceptionistResponse> getTest(@PathVariable int testId){
       TestForReceptionistResponse test = testRepository.getTest(testId);
        if (test == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(test, HttpStatus.OK);
    }


    @GetMapping("/receptionist/department/{departmentId}/doctors")
    public ResponseEntity<List<Doctor>> getDoctorsByDepartment(@PathVariable Integer departmentId){
        List<Doctor> doctors = doctorRepository.findByDepartmentId(departmentId);
        if(doctors.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @PostMapping("/receptionist/patient")
    public ResponseEntity<Integer> insertPatient(@RequestBody Patient patient){
        return new ResponseEntity<>(patientRepository.save(patient) ,HttpStatus.OK);
    }

    @PostMapping("/receptionist/doctor")
    public ResponseEntity<Integer> insertDoctor(@RequestBody Doctor doctor){
        return new ResponseEntity<>(doctorRepository.save(doctor) ,HttpStatus.OK);
    }

    @PostMapping("/receptionist/appointment")
    public ResponseEntity<Integer> insertAppointment(@RequestBody ReceptionistAppointmentUpdateRequest request){
        request.setAppointmentStatus("CREATED");
        request.setPaymentStatus("NOT PAID");
        return new ResponseEntity<>(appointmentRepository.save(request) ,HttpStatus.OK);
    }

    @PostMapping("/receptionist/test")
    public ResponseEntity<Integer> insertTest(@RequestBody ReceptionistTestUpdateRequest request){
        request.setTestStatus("CREATED");
        request.setPaymentStatus("NOT PAID");
        return new ResponseEntity<>(testRepository.save(request) ,HttpStatus.OK);
    }


    @PutMapping("/receptionist/patient")
    public ResponseEntity<Integer> updatePatient(@RequestBody Patient patient){
        return new ResponseEntity<>(patientRepository.update(patient) ,HttpStatus.OK);
    }

    @PutMapping("/receptionist/doctor")
    public ResponseEntity<Integer> updateDoctor(@RequestBody Doctor doctor){
        return new ResponseEntity<>(doctorRepository.update(doctor), HttpStatus.OK);
    }

    @PutMapping("/receptionist/appointment")
    public ResponseEntity<Integer> updateAppointment(@RequestBody ReceptionistAppointmentUpdateRequest request){
        return new ResponseEntity<>(appointmentRepository.updateAppointmentForReceptionist(request) ,HttpStatus.OK);
    }

    @PutMapping("/receptionist/test")
    public ResponseEntity<Integer> updateTest(@RequestBody ReceptionistTestUpdateRequest request){
        return new ResponseEntity<>(testRepository.updateTestForReceptionist(request) ,HttpStatus.OK);
    }

    @GetMapping("/receptionist/doctor/{doctorId}/date/{appointmentBeginDate}/appointments")
    public ResponseEntity<List<AppointmentDateForReceptionistResponse>> getAppointmentDatesWithDoctorAndDate(@PathVariable int doctorId, @PathVariable String appointmentBeginDate){
        return new ResponseEntity<>(appointmentRepository.getAppointmentDatesWithDoctorAndDateForReceptionist(doctorId,appointmentBeginDate) ,HttpStatus.OK);
    }

    @GetMapping("/receptionist/patient/{patientId}")
    public ResponseEntity<Patient> gePatient(@PathVariable int patientId){
        Patient patient = patientRepository.findById(patientId);
        if(patient == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping("/receptionist/doctor/{doctorId}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable int doctorId){
        Doctor doctor = doctorRepository.findById(doctorId);
        if(doctor == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @GetMapping("/receptionist/payments")
    public ResponseEntity<List<PaymentForReceptionistResponse>> getPayments(){
        List<PaymentForReceptionistResponse> payments = paymentRepository.findAll();
        if(payments == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    @GetMapping("/receptionist/appointments/not-paid")
    public ResponseEntity<List<AppointmentPaymentResponse>> getNotPaidAppointments(){
        List<AppointmentPaymentResponse> allNotPaidAppointments = paymentRepository.findAllNotPaidAppointments();
        if(allNotPaidAppointments == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(allNotPaidAppointments, HttpStatus.OK);
    }

    @GetMapping("/receptionist/tests/not-paid")
    public ResponseEntity<List<TestPaymentResponse>> getNotPaidTests(){
        List<TestPaymentResponse> testPaymentResponses = paymentRepository.findAllNotPaidTests();
        if(testPaymentResponses == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(testPaymentResponses, HttpStatus.OK);
    }

    @DeleteMapping("/receptionist/patient/{patientId}")
    public ResponseEntity<Integer> deletePatient(@PathVariable int patientId){
        return new ResponseEntity<>(patientRepository.deleteById(patientId), HttpStatus.OK);
    }

    @DeleteMapping("/receptionist/doctor/{doctorId}")
    public ResponseEntity<Integer> deleteDoctor(@PathVariable int doctorId){
        return new ResponseEntity<>(doctorRepository.deleteById(doctorId), HttpStatus.OK);
    }

}
