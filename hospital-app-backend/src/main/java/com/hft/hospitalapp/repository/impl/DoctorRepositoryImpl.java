package com.hft.hospitalapp.repository.impl;

import com.hft.hospitalapp.entity.Doctor;
import com.hft.hospitalapp.model.response.*;
import com.hft.hospitalapp.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DoctorRepositoryImpl implements DoctorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<DoctorResponse> findAll() {
        return jdbcTemplate.query("select A.id as id, A.title as title, A.fullname as fullname, A.gender as gender,  B.fullname as supervisor, departmentName\n" +
                "from doctor A inner join doctor B on A.supervisorId = B.id inner join department on A.depID = department.id", BeanPropertyRowMapper.newInstance(DoctorResponse.class));
    }

    @Override
    public DoctorResponse findByIdForPatient(int doctorId) {
        String query = "select doctor.id as id , title, fullname, gender, department.departmentName as departmentName" +
                " from doctor inner join department on doctor.depID = department.id where doctor.id = ?";
        return jdbcTemplate.query(query, ps -> ps.setInt(1,doctorId), BeanPropertyRowMapper.newInstance(DoctorResponse.class)).get(0);
    }

    @Override
    public Doctor findById(int doctorId) {
        String query = "select * from doctor where id = ?";
        return jdbcTemplate.query(query, ps -> ps.setInt(1,doctorId), BeanPropertyRowMapper.newInstance(Doctor.class)).get(0);
    }

    @Override
    public Integer update(Doctor doctor) {
        String query = "update doctor set title = ? , fullname = ?, gender = ?, depId = ?, supervisorId = ? where id = ?";
        return jdbcTemplate.update(query, doctor.getTitle(), doctor.getFullname(), doctor.getGender(), doctor.getDepID(), doctor.getSupervisorId(), doctor.getId());
    }

    @Override
    public Integer save(Doctor doctor) {
        String query = "insert into doctor (title, fullname, gender, depId, supervisorId) values (?,?,?,?,?)";
        return jdbcTemplate.update(query, doctor.getTitle(), doctor.getFullname(), doctor.getGender(), doctor.getDepID(), doctor.getSupervisorId());
    }

    @Override
    public Integer deleteById(int doctorId) {
        String query = "delete from doctor where id = ?";
        return jdbcTemplate.update(query,doctorId);
    }

    @Override
    public List<PatientForDoctorResponse> findAllPatients(Integer doctorId) {
        String query = "select patient.id, insuranceId, fullname, birthday, gender, address" +
                " from patient inner join appointment on appointment.patientId = patient.id" +
                " where appointment.doctorId = ? group by appointment.patientId";
        return jdbcTemplate.query(query, (ps) -> ps.setString(1, String.valueOf(doctorId)), BeanPropertyRowMapper.newInstance(PatientForDoctorResponse.class));
    }

    @Override
    public List<AppointmentHistoryDoctorResponse> findAllAppointments(Integer patientId) {
        String query = "select appointment.id, appointmentBeginDate, appointmentEndDate, appointmentStatus, doctorComment, doctor.fullname from appointment inner join doctor" +
                " on appointment.doctorId = doctor.id where patientId = ?";
        return jdbcTemplate.query(query, (ps) -> ps.setString(1, String.valueOf(patientId)), BeanPropertyRowMapper.newInstance(AppointmentHistoryDoctorResponse.class));
    }

    @Override
    public List<TestHistoryDoctorResponse> findAllTests(Integer patientId) {
        String query = "select id, diagnosis, testDate, testType, testPrice, testStatus, paymentStatus" +
                " from test where patientId = ?";
        return jdbcTemplate.query(query, (ps) -> ps.setString(1, String.valueOf(patientId)), BeanPropertyRowMapper.newInstance(TestHistoryDoctorResponse.class));

    }

    @Override
    public List<Doctor> findByDepartmentId(Integer departmentId) {
        String query = "select * from doctor where doctor.depId = ?";
        return jdbcTemplate.query(query, ps -> ps.setString(1, String.valueOf(departmentId)), BeanPropertyRowMapper.newInstance(Doctor.class));
    }

}
