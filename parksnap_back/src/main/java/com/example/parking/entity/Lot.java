package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Lot")
public class Lot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lotId;

    private String location;
    private int noOfSlots;

    @OneToMany(mappedBy = "lot", cascade = CascadeType.ALL)
    private List<Slot> slots;
}
