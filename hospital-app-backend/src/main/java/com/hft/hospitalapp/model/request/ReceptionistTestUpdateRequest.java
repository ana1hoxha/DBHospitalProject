package com.hft.hospitalapp.model.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceptionistTestUpdateRequest {

    private String testDate;
    private String doctorId;
    private String patientId;
    private String diagnosis;
    private String testType;
    private String testPrice;
    private String testStatus;
    private String paymentStatus;
    private String testId;

}
