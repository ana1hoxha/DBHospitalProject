package com.hft.hospitalapp.controller;

import com.hft.hospitalapp.entity.Login;
import com.hft.hospitalapp.model.request.LoginRequest;
import com.hft.hospitalapp.model.response.LoginResponse;
import com.hft.hospitalapp.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class LoginController {

    @Autowired
    private LoginRepository loginRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        Login user = loginRepository.findById(Integer.parseInt(loginRequest.getId()));

        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(!loginRequest.getPassword().equals(user.getPassw())){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(new LoginResponse(user.getId(), user.getUserRole()),HttpStatus.OK);
    }

}
