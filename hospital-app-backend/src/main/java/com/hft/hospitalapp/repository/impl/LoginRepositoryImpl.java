package com.hft.hospitalapp.repository.impl;

import com.hft.hospitalapp.entity.Login;
import com.hft.hospitalapp.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class LoginRepositoryImpl implements LoginRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Login findById(Integer id) {
        String sql = "select * from login where login.id = ?";
        List<Login> loginList = jdbcTemplate.query(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps) throws SQLException {
                ps.setString(1,id.toString());
            }
        }, BeanPropertyRowMapper.newInstance(Login.class));
        if (loginList.isEmpty()) {
            return null;
        }
        return loginList.get(0);
    }

}
