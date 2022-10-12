package com.hft.hospitalapp.repository;

import com.hft.hospitalapp.entity.Doctor;
import com.hft.hospitalapp.model.response.*;

import java.util.List;

public interface DoctorRepository {

    List<DoctorResponse> findAll();

    Doctor findById(int doctorId);

    DoctorResponse findByIdForPatient(int doctorId);

    Integer update(Doctor doctor);

    Integer save(Doctor doctor);

    Integer deleteById(int doctorId);

    List<PatientForDoctorResponse> findAllPatients(Integer doctorId);

    List<AppointmentHistoryDoctorResponse> findAllAppointments(Integer patientId);

    List<TestHistoryDoctorResponse> findAllTests(Integer patientId);

    List<Doctor> findByDepartmentId(Integer departmentId);

}
