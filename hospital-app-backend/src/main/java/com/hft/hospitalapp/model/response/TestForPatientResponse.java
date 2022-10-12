package com.hft.hospitalapp.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestForPatientResponse {
    private String id;
    private String diagnosis;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date testDate;
    private String fullname;
    private String testType;
    private String testPrice;
    private String testStatus;
    private String paymentStatus;
    private String departmentName;
}
