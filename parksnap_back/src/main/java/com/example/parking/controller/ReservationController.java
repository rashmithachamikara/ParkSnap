package com.example.parking.controller;

import com.example.parking.dto.ReservationDTO;
import com.example.parking.dto.ResponseDTO;
import com.example.parking.repo.ReservationRepo;
import com.example.parking.service.ReservationService;
import com.example.parking.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("api/v1/reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ResponseDTO responseDTO;
    @Autowired
    private ReservationRepo reservationRepo;
    @Autowired
    private ModelMapper modelMapper;

    // SAVE
    @PostMapping("/saveReservation")
    public ResponseEntity saveReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            String res= reservationService.saveReservation(reservationDTO);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(reservationDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else if (res.equals("06")){
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("Already Reserved");
                responseDTO.setContent(reservationDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            }else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // UPDATE
    @PutMapping(value = "/updateReservation")
    public ResponseEntity updateReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            String res= reservationService.updateReservation(reservationDTO);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(reservationDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else if (res.equals("01")){
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Reservation Found");
                responseDTO.setContent(reservationDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            }else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }//now create the responseDTO
        }catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //DELETE
    @DeleteMapping(value = "/deleteReservation/{reservationId}")
    public ResponseEntity deleteReservation(@PathVariable int reservationId) {
        try {
            String res = reservationService.deleteReservation(reservationId);
            if (res.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No Reservation Found");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }//now create the responseDTO
        }catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(e);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // getSlotDataById
    @GetMapping("/getSlotDataById/{slotId}")
    public ResponseEntity<List<Map<String, Object>>> getSlotDataById(@PathVariable("slotId") int slotId) {
        try {
            List<Map<String, Object>> reservationDetails = reservationService.getReservationDetailsBySlotId(slotId);
            return new ResponseEntity<>(reservationDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
