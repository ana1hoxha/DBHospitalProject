package com.hft.hospitalapp.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDateForReceptionistResponse {
    private Date appointmentBeginDate;
}
