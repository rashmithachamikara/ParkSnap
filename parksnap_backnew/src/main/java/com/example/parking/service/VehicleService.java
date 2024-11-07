package com.example.parking.service;

import com.example.parking.dto.LotDTO;
import com.example.parking.dto.VehicleDTO;
import com.example.parking.entity.Lot;
import com.example.parking.entity.User;
import com.example.parking.entity.Vehicle;
import com.example.parking.repo.UserRepo;
import com.example.parking.repo.VehicleRepo;
import com.example.parking.util.VarList;
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

    public String saveVehicle(VehicleDTO vehicleDTO) {
        if (vehicleRepo.existsById(vehicleDTO.getVehicleId())) {
            return VarList.RSP_DUPLICATED;
        } else {
            vehicleRepo.save(modelMapper.map(vehicleDTO, Vehicle.class));
            return VarList.RSP_SUCCESS;
        }
    }

    public String updateVehicle(VehicleDTO vehicleDTO) {
        if (vehicleRepo.existsById(vehicleDTO.getVehicleId())) {
            vehicleRepo.save(modelMapper.map(vehicleDTO, Vehicle.class));
            return VarList.RSP_SUCCESS;
        } else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
