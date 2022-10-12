package com.hft.hospitalapp.model.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceptionistAppointmentUpdateRequest {

    private String doctorId;
    private String appointmentId;
    private String appointmentStatus;
    private String paymentStatus;
    private String doctorComment;
    private String patientId;
    private String appointmentPrice;
    private String appointmentBeginDate;
    private String appointmentEndDate;

}
