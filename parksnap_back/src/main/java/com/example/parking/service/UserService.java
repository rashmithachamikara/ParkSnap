package com.example.parking.service;

import com.example.parking.dto.UserDTO;
import com.example.parking.entity.User;
import com.example.parking.repo.UserRepo;
import com.example.parking.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    public UserDTO getUserById(int userId) {
        if (userRepo.existsById(userId)) {
            User user = userRepo.findById(userId).orElse(null);
            return modelMapper.map(user,UserDTO.class);
        } else {
            return null;
        }
    }

    public String updateUser(UserDTO userDTO) {
        if (userRepo.existsById(userDTO.getUserId())) {
            userRepo.save(modelMapper.map(userDTO,User.class));
            return VarList.RSP_SUCCESS;
        } else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
