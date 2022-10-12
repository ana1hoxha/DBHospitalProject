package com.hft.hospitalapp.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {

    private Integer id;
    private String title;
    private String fullname;
    private String gender;
    private Integer depID;
    private Integer supervisorId;

}
