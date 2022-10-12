package com.hft.hospitalapp.repository;

import com.hft.hospitalapp.entity.Patient;
import com.hft.hospitalapp.model.response.AppointmentForPatientResponse;
import com.hft.hospitalapp.model.response.TestForPatientResponse;

import java.util.List;

public interface PatientRepository {

    List<Patient> findAll();

    Patient findById(int patientId);

    Integer save(Patient patient);

    Integer update(Patient patient);

    Integer deleteById(int patientId);

    List<AppointmentForPatientResponse> findAllAppointments(Integer patientId);

    List<TestForPatientResponse> findAllTests(Integer patientId);

}
