package com.hft.hospitalapp.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorUpdateRequest {

    private Integer id;
    private String title;
    private String fullname;
    private String gender;
    private String department;
    private String supervisor;

}
