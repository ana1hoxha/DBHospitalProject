package com.hft.hospitalapp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Login {

    private Integer id;
    private String passw;
    private String userRole;

}
