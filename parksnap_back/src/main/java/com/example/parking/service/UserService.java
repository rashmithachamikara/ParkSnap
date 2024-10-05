package com.example.parking.service;

import com.example.parking.dto.UserDTO;
import com.example.parking.entity.User;
import com.example.parking.repo.UserRepo;
import com.example.parking.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
            User existingUser = userRepo.findById(userDTO.getUserId()).orElse(null);

            if (existingUser != null) {
                // Only update fields that you want to allow to be changed.
                existingUser.setName(userDTO.getName());
                existingUser.setPhoneNo(userDTO.getPhoneNo());

                // The username is not updated here, so it remains unchanged.
                userRepo.save(existingUser);

                return VarList.RSP_SUCCESS;
            }
        }
        return VarList.RSP_NO_DATA_FOUND;
    }

    public Integer findUserIdByUsername(String username) {
        Optional<User> user = userRepo.findByUsername(username);
        return user.map(User::getUserId).orElse(null);
    }
}
