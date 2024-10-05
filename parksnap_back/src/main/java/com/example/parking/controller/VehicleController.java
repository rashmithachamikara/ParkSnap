package com.example.parking.controller;

import com.example.parking.dto.ResponseDTO;
import com.example.parking.dto.VehicleDTO;
import com.example.parking.service.VehicleService;
import com.example.parking.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/vehicle")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private ResponseDTO responseDTO;

    @GetMapping("/getVehiclesByUserId")
    public ResponseEntity getVehiclesByUserId(@RequestParam int userId) {
        try {
            List<VehicleDTO> vehicleDTOList = vehicleService.getVehiclesByUserId(userId);
            if (vehicleDTOList !=null) {
                if (vehicleDTOList.size()==0) {
                    //No vehicles for user
                    responseDTO.setCode(VarList.RSP_SUCCESS);
                    responseDTO.setMessage("No Vehicles Available For this userId");
                    responseDTO.setContent(vehicleDTOList);
                    return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
                }
                //Vehicles available for user
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(vehicleDTOList);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                //Not a valid userId
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Users Available For this userId");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            //Unknown error case
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(e);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/saveVehicle")
    public ResponseEntity saveVehicle(@RequestBody VehicleDTO vehicleDTO) {
        try{
            String res = vehicleService.saveVehicle(vehicleDTO);
            if (res.equals("00")){
                //Success
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (res.equals("01")){
                //Duplicate
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("Vehicle ID already in Use!");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            } else {
                //If something else
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Unknown Error!");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Unknown Server Error!");
            responseDTO.setContent(vehicleDTO);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/updateVehicle")
    public ResponseEntity updateVehicle(@RequestBody VehicleDTO vehicleDTO) {
        try{
            String res = vehicleService.updateVehicle(vehicleDTO);
            if (res.equals("00")){
                //Success
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else if (res.equals("01")){
                //Duplicate
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("Not a vehicle in system!");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            } else {
                //If something else
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Unknown Error!");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Unknown Server Error!");
            responseDTO.setContent(vehicleDTO);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
