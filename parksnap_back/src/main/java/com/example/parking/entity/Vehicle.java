package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Vehicle")
public class Vehicle {
    @Id
    private int vehicleID;
    private String license_plate;
    private String type;

    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;



}
