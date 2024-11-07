package com.example.parking.service;

import com.example.parking.dto.ReservationDTO;
import com.example.parking.entity.Reservation;
import com.example.parking.repo.ReservationRepo;
import com.example.parking.util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
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

    public Map<String, Long> getReservationsCountByWeek(LocalDate weekStart) {
        // Get the start and end dates of the week
        LocalDateTime startDateTime = weekStart.atStartOfDay(); // Start of the week (Monday)
        LocalDateTime endDateTime = weekStart.plusDays(6).atTime(23, 59, 59); // End of the week (Sunday)

        // Call the repository method
        List<Object[]> results = reservationRepo.findReservationCountByDayOfWeek(startDateTime, endDateTime);

        // Map the results to a map of [dayName -> reservationCount]
        Map<String, Long> reservationCountByDay = new LinkedHashMap<>();
        for (Object[] result : results) {
            String dayName = (String) result[0]; // e.g., "Monday"
            Long count = ((Number) result[1]).longValue(); // Count of reservations for that day
            reservationCountByDay.put(dayName, count);
        }

        return reservationCountByDay;
    }

    public Map<String, Long> getReservationsCountBetween(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        // Call the repository method
        List<Object[]> results = reservationRepo.findReservationCountByDay(startDateTime, endDateTime);

        // Map the results to a map of [reservationDate -> reservationCount]
        Map<String, Long> reservationCountByDay = new LinkedHashMap<>();
        for (Object[] result : results) {
            String reservationDate = ((java.sql.Date) result[0]).toLocalDate().toString(); // Convert LocalDate to String
            Long count = ((Number) result[1]).longValue(); // Count of reservations for that date
            reservationCountByDay.put(reservationDate, count);
        }

        return reservationCountByDay;
    }
}
