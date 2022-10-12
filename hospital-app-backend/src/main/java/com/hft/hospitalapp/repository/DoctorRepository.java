package com.hft.hospitalapp.repository;

import com.hft.hospitalapp.model.Doctor;

import java.util.List;

public interface DoctorRepository {

    List<Doctor> findAll();

}
