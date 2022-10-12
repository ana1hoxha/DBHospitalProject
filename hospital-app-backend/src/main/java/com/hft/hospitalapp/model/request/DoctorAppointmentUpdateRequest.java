package com.hft.hospitalapp.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorAppointmentUpdateRequest {

    private int doctorId;
    private String appointmentId;
    private String appointmentStatus;
    private String doctorComment;

}
