package com.hft.hospitalapp.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientForDoctorResponse {
    private String id;
    private String insuranceId;
    private String fullname;
    private String gender;
    private String birthday;
    private String address;
}
