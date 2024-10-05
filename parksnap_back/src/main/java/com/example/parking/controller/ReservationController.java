package com.example.parking.controller;

import com.example.parking.dto.ReservationDTO;
import com.example.parking.dto.ResponseDTO;
import com.example.parking.repo.ReservationRepo;
import com.example.parking.service.ReservationService;
import com.example.parking.service.UserService;
import com.example.parking.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private UserService userService;
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

    // getSlotDataById. Admin only
    @GetMapping("/getSlotDataById/{slotId}")
    public ResponseEntity<List<Map<String, Object>>> getSlotDataById(@PathVariable("slotId") int slotId) {
        try {
            // Fetch logged-in user's username (assuming username is the user's identifier)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String loggedInUsername = ((UserDetails) authentication.getPrincipal()).getUsername();

            // Fetch reservation details
            List<Map<String, Object>> reservationDetails = reservationService.getReservationDetailsBySlotId(slotId);

            // Check if the logged-in user is an admin or the reservation belongs to the user
            boolean isAuthorized = reservationDetails.stream().anyMatch(reservation -> {
                Integer userId = (Integer) reservation.get("user_id"); // Assuming "user_id" is part of the reservation details
                return isUserAdmin(authentication) || isReservationOwner(loggedInUsername, userId);
            });

            // Return forbidden if the user is neither admin nor the owner
            if (!isAuthorized) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            return new ResponseEntity<>(reservationDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Helper method to check if the logged-in user is an admin
    private boolean isUserAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
    }

    // Helper method to check if the logged-in user owns the reservation
    private boolean isReservationOwner(String loggedInUsername, Integer reservationUserId) {
        // Assuming you have a method to fetch the logged-in user's ID by their username
        Integer loggedInUserId = getUserIdByUsername(loggedInUsername);
        return loggedInUserId.equals(reservationUserId);
    }

    // Mock method: Replace this with your actual user service to get the userId from the username
    private Integer getUserIdByUsername(String username) {
        // You would typically fetch the userId from your UserService or database
        return userService.findUserIdByUsername(username);
    }
}
