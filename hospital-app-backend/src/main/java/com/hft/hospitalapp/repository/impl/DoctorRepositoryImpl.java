package com.hft.hospitalapp.repository.impl;

import com.hft.hospitalapp.model.Doctor;
import com.hft.hospitalapp.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DoctorRepositoryImpl implements DoctorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Doctor> findAll() {
        return jdbcTemplate.query("SELECT * from doctor", BeanPropertyRowMapper.newInstance(Doctor.class));
    }
}
