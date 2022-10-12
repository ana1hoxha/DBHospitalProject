package com.hft.hospitalapp.repository;

import com.hft.hospitalapp.model.Department;

import java.util.List;

public interface DepartmentRepository {

    List<Department> findAll();

}
