package com.hft.hospitalapp.repository;

import com.hft.hospitalapp.entity.Department;

import java.util.List;

public interface DepartmentRepository {

    List<Department> findAll();

}
