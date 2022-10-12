package com.hft.hospitalapp.repository.impl;

import com.hft.hospitalapp.model.request.DoctorTestUpdateRequest;
import com.hft.hospitalapp.model.request.ReceptionistTestUpdateRequest;
import com.hft.hospitalapp.model.response.TestDoctorResponse;
import com.hft.hospitalapp.model.response.TestForReceptionistResponse;
import com.hft.hospitalapp.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TestRepositoryImpl implements TestRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public List<TestDoctorResponse> findAll(Integer doctorId) {
        String query = "select test.id, diagnosis,testDate, patient.fullname as patient, testType, testStatus" +
                " from test inner join patient  on test.patientId = patient.id where test.doctorId = ?";
        return jdbcTemplate.query(query , (ps) -> ps.setString(1, String.valueOf(doctorId)), BeanPropertyRowMapper.newInstance(TestDoctorResponse.class));
    }

    @Override
    public List<TestDoctorResponse> findAllToday(Integer doctorId) {
        String query = "SELECT test.id, diagnosis,testDate, patient.fullname as patient, testType, testStatus" +
                " FROM test,  patient" +
                " WHERE test.patientId = patient.id" +
                " AND date_format(testDate, '%y-%m-%d') = curdate()" +
                " AND doctorId = ?";
        return jdbcTemplate.query(query , (ps) -> ps.setString(1, String.valueOf(doctorId)), BeanPropertyRowMapper.newInstance(TestDoctorResponse.class));
    }

    @Override
    public Integer updateTestForDoctor(DoctorTestUpdateRequest request) {
        String query = "Update test set  testStatus = ?, diagnosis = ? where test.id  = ? and test.doctorId = ?";
        return jdbcTemplate.update(query,request.getTestStatus(),request.getDiagnosis(), request.getTestId(), request.getDoctorId());
    }

    @Override
    public Integer cancelTestByPatient(int testId) {
        String query = "update test set testStatus = 'CANCELLED BY PATIENT' where id = ?";
        return jdbcTemplate.update(query,testId);
    }


    @Override
    public List<TestForReceptionistResponse> getAllTestsForReceptionist() {
        String query = "select test.id, diagnosis ,testDate , doctor.fullname as doctor, patient.fullname as patient,"
                + "testType,testPrice,testStatus ,paymentStatus from test " +
                "inner join patient on patient.id = test.patientId inner join doctor on doctor.id = test.doctorId";
        return jdbcTemplate.query(query,BeanPropertyRowMapper.newInstance(TestForReceptionistResponse.class));
    }

    @Override
    public Integer updateTestForReceptionist(ReceptionistTestUpdateRequest request) {
        String query = "update test set testDate = ?,testType = ? , testPrice = ?," +
                "testStatus = ? , paymentStatus = ? where id = ?";
        return jdbcTemplate.update(query,request.getTestDate(), request.getTestType(), request.getTestPrice(),request.getTestStatus(), request.getPaymentStatus(), request.getTestId());
    }


    @Override
    public Integer save(ReceptionistTestUpdateRequest request) {
        String query = "insert into test(testDate ,diagnosis, doctorId, patientId, testType, testPrice , testStatus, paymentStatus) " +
                "values (?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(query,request.getTestDate(),request.getDiagnosis(), request.getDoctorId(),
                request.getPatientId(), request.getTestType(), request.getTestPrice(), request.getTestStatus(), request.getPaymentStatus());
    }



    @Override
    public TestForReceptionistResponse getTest(int testId) {
        String query = "select test.id, diagnosis ,testDate , doctor.fullname as doctor, patient.fullname as patient,"
                + "testType,testPrice,testStatus ,paymentStatus from test " +
                "inner join patient on patient.id = test.patientId inner join doctor on doctor.id = test.doctorId where test.id = ?";
        return jdbcTemplate.query(query, ps -> ps.setInt(1, testId), BeanPropertyRowMapper.newInstance(TestForReceptionistResponse.class)).get(0);
    }

}
