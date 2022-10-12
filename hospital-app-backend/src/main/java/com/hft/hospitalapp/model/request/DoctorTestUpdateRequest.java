package com.hft.hospitalapp.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorTestUpdateRequest {

    private int doctorId;
    private String testId;
    private String testStatus;
    private String diagnosis;
    private String testType;

}
