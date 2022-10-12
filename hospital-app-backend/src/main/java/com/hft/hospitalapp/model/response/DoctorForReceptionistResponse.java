package com.hft.hospitalapp.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorForReceptionistResponse {
    private String id;
    private String title;
    private String fullname;
    private String gender;
    private String departmentName;
    private String supervisor;
}
