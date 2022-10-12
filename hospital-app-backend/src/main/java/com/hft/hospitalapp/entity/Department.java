package com.hft.hospitalapp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Department {

    private Integer id;
    private String departmentName;
    private Integer totalDoctors;
    private Integer activeAppointments;

}
