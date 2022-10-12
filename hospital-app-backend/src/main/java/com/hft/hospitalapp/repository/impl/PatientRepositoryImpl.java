package com.hft.hospitalapp.repository.impl;

import com.hft.hospitalapp.entity.Patient;
import com.hft.hospitalapp.model.response.AppointmentForPatientResponse;
import com.hft.hospitalapp.model.response.TestForPatientResponse;
import com.hft.hospitalapp.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PatientRepositoryImpl implements PatientRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Patient> findAll() {
        return jdbcTemplate.query("select * from patient", BeanPropertyRowMapper.newInstance(Patient.class));
    }

    @Override
    public Patient findById(int patientId) {
        String query = "select * from patient where id = ?";
        return jdbcTemplate.query(query, ps -> ps.setInt(1,patientId), BeanPropertyRowMapper.newInstance(Patient.class)).get(0);
    }

    @Override
    public Integer save(Patient patient) {
        String query = "insert into patient ( insuranceId, fullname, birthday, gender, address) " +
                "values(?,?,?,?,?)";
        return jdbcTemplate.update(query, patient.getInsuranceId(), patient.getFullname(), patient.getBirthday(), patient.getGender(), patient.getAddress());
    }

    @Override
    public Integer update(Patient patient) {
        String query = "update patient set insuranceId = ?, fullname = ?, birthday = ?, gender = ?, " +
                "address = ? where id = ?";
        return jdbcTemplate.update(query, patient.getInsuranceId(), patient.getFullname(), patient.getBirthday(), patient.getGender(), patient.getAddress(), patient.getId());
    }

    @Override
    public Integer deleteById(int patientId) {
        String query = "delete from patient where id = ?";
        return jdbcTemplate.update(query,patientId);
    }

    @Override
    public List<AppointmentForPatientResponse> findAllAppointments(Integer patientId) {
        String query = "select appointment.id, appointmentBeginDate, appointmentEndDate, doctorComment, appointmentStatus, paymentStatus, doctor.fullname as doctorName, doctorId, appointmentPrice," +
                " department.departmentName as department  from appointment inner join doctor on appointment.doctorId = doctor.id  inner join department on doctor.depID = department.id" +
                " where appointment.patientId = ?";
        return jdbcTemplate.query(query, ps -> ps.setInt(1, patientId), BeanPropertyRowMapper.newInstance(AppointmentForPatientResponse.class));
    }

    @Override
    public List<TestForPatientResponse> findAllTests(Integer patientId) {
        String query = "select test.id, diagnosis, testDate, doctor.fullname, testType, testPrice, testStatus, paymentStatus, department.departmentName from test inner" +
                " join doctor on test.doctorId = doctor.id inner join department on doctor.depID = department.id  where test.patientId = ?";
        return jdbcTemplate.query(query, ps -> ps.setInt(1, patientId), BeanPropertyRowMapper.newInstance(TestForPatientResponse.class));
    }
}
