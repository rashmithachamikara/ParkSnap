package com.example.parking.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class ReservationId implements Serializable {

    private int slotId;
    private int userId;
    private int vehicleId;
}
