package com.example.parking.service;

import com.example.parking.dto.UserDTO;
import com.example.parking.dto.VehicleDTO;
import com.example.parking.entity.Vehicle;
import com.example.parking.repo.UserRepo;
import com.example.parking.repo.VehicleRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class VehicleService {
    @Autowired
    private VehicleRepo vehicleRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<VehicleDTO> getVehiclesByUserId(int userId) {
        if (userRepo.existsById(userId)) {
            List<Vehicle> vehicleList = vehicleRepo.getVehiclesByUserId(userId);
            return modelMapper.map(vehicleList, new TypeToken<List<VehicleDTO>>() {}.getType());
        } else {
            return null;
        }
    }
}
