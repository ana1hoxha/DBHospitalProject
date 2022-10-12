package com.hft.hospitalapp.repository;

import com.hft.hospitalapp.entity.Login;

public interface LoginRepository {

    Login findById(Integer id);

}
