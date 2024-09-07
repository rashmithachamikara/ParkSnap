package com.example.parking.service;

import com.example.parking.dto.ReservationDTO;
import com.example.parking.entity.Reservation;
import com.example.parking.repo.ReservationRepo;
import com.example.parking.util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {

    @Autowired
    private ReservationRepo reservationRepo;
    @Autowired
    private ModelMapper modelMapper;

    // SAVE
    public String saveReservation(ReservationDTO reservationDTO) {
        if (reservationRepo.existsById(reservationDTO.getReservationId())){
            return VarList.RSP_DUPLICATED;
        }else{
            reservationRepo.save(modelMapper.map(reservationDTO, Reservation.class));
            return VarList.RSP_SUCCESS;
        }
    }
    // UPDATE
    public String updateReservation(ReservationDTO reservationDTO) {
        if (reservationRepo.existsById(reservationDTO.getReservationId())){
            reservationRepo.save(modelMapper.map(reservationDTO, Reservation.class));
            return VarList.RSP_SUCCESS;
        }else{
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
    // DELETE
    public String deleteReservation(int reservationId) {
        if (reservationRepo.existsById(reservationId)){
            reservationRepo.deleteById(reservationId);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

    // Query for getSlotDataById
    public List<Map<String, Object>> getReservationDetailsBySlotId(int slotId) {
        List<Object[]> results = reservationRepo.findReservationDetailsBySlotId(slotId);

        // Map results to a list of maps
        return results.stream().map(result -> Map.of(
                "user_id", result[0],
                "name", result[1],
                "username", result[2],
                "phone_no", result[3],
                "start_time", result[4],
                "reservation_id", result[5],
                "license_plate", result[6]
        )).collect(Collectors.toList());
    }

}
