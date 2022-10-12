package com.hft.hospitalapp.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentForPatientResponse {
    private String id;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date appointmentBeginDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date appointmentEndDate;
    private String doctorComment;
    private String appointmentStatus;
    private String paymentStatus;
    private String appointmentPrice;
    private String doctorId;
    private String doctorName;
    private String department;
}
