package com.example.parking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VehicleDTO {
    private int vehicleId;
    private int typeId;
    private int userId;
    private String licensePlate;
    private String type;
}
