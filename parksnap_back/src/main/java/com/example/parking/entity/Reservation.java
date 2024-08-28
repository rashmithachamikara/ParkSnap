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

    @ManyToOne
    @JoinColumn(name = "slotId", insertable = false, updatable = false)
    private Slot slot;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "vehicleId", insertable = false, updatable = false)
    private Vehicle vehicle;

    private Integer duration;

    private LocalDateTime startTime;
}
