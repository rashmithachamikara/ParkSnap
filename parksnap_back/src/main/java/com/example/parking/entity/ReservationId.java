package com.example.parking.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Data
@Embeddable
public class ReservationId implements Serializable {

    private Long slotId;
    private Long userId;
    private Long vehicleId;
}
