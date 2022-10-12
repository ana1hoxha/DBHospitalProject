package com.hft.hospitalapp.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {

    private Integer id;
    private String insuranceId;
    private String fullname;
    private String gender;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;
    private String address;

}
