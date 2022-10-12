package com.hft.hospitalapp.repository;

import com.hft.hospitalapp.model.request.DoctorAppointmentUpdateRequest;
import com.hft.hospitalapp.model.request.ReceptionistAppointmentUpdateRequest;
import com.hft.hospitalapp.model.response.AppointmentDateForReceptionistResponse;
import com.hft.hospitalapp.model.response.AppointmentDoctorResponse;
import com.hft.hospitalapp.model.response.AppointmentForReceptionistResponse;

import java.util.List;

public interface AppointmentRepository {

    List<AppointmentDoctorResponse> findAll(Integer doctorId);

    List<AppointmentDoctorResponse> findAllToday(Integer doctorId);

    Integer updateAppointmentForDoctor(DoctorAppointmentUpdateRequest request);

    Integer updateAppointmentForReceptionist(ReceptionistAppointmentUpdateRequest request);

    Integer cancelAppointmentByPatient(int appointmentId);

    List<AppointmentForReceptionistResponse> getAllAppointmentsForReceptionist();

    List<AppointmentDateForReceptionistResponse> getAppointmentDatesWithDoctorAndDateForReceptionist(int doctorId, String appointmentBeginDate); // YYYY-mm-dd

    Integer save(ReceptionistAppointmentUpdateRequest request);

    AppointmentForReceptionistResponse getAppointment(int appointmentId);

}
