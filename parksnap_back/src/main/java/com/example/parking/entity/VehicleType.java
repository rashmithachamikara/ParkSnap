package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "VehicleType")
public class VehicleType {
    @Id
    private int typeId;

    private String typeName;

    @OneToMany(mappedBy = "vehicleType", cascade = CascadeType.ALL)
    private Set<Vehicle> vehicles;
}