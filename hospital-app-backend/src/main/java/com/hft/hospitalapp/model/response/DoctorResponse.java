package com.hft.hospitalapp.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorResponse {
    private String id;
    private String title;
    private String fullname;
    private String gender;
    private String departmentName;
    private String supervisor;
}
