package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Reservation")
public class Reservation {

    @EmbeddedId
    private ReservationId id;

    @MapsId("slotId")
    @ManyToOne
    @JoinColumn(name = "slot_id", nullable = false)
    private Slot slot;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("vehicleId")
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    private Integer duration;

    private LocalDateTime startTime;
}
