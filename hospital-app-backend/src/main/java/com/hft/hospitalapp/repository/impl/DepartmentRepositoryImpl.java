package com.hft.hospitalapp.repository.impl;

import com.hft.hospitalapp.entity.Department;
import com.hft.hospitalapp.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DepartmentRepositoryImpl implements DepartmentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Department> findAll() {
        return jdbcTemplate.query("SELECT * from department", BeanPropertyRowMapper.newInstance(Department.class));
    }

}
