package com.hft.hospitalapp.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    private Integer id;
    private String patient;
    private String appointmentId;
    private String testId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date paymentDate;
    private String price;

}
