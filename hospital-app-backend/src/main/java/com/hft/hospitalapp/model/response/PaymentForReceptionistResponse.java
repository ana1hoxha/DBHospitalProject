package com.hft.hospitalapp.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentForReceptionistResponse {
    private Integer id;
    private String appointmentId;
    private String testId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date paymentDate;
    private String price;
    private String fullname;

}
