package com.hft.hospitalapp.repository;


import com.hft.hospitalapp.model.request.DoctorTestUpdateRequest;
import com.hft.hospitalapp.model.request.ReceptionistTestUpdateRequest;
import com.hft.hospitalapp.model.response.TestDoctorResponse;
import com.hft.hospitalapp.model.response.TestForReceptionistResponse;
import java.util.List;

public interface TestRepository {

    List<TestDoctorResponse> findAll(Integer doctorId);

    List<TestDoctorResponse> findAllToday(Integer doctorId);

    Integer updateTestForDoctor(DoctorTestUpdateRequest request);

    Integer cancelTestByPatient(int testId);

    List<TestForReceptionistResponse> getAllTestsForReceptionist();

    Integer updateTestForReceptionist(ReceptionistTestUpdateRequest request);

    Integer save(ReceptionistTestUpdateRequest request);

    TestForReceptionistResponse getTest(int testId);
}
