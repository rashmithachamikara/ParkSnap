package com.example.parking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservationDTO {
    private int reservationId;
    private int slotId;
    private int userId;
    private int vehicleId;
    private LocalDateTime startTime;
}
