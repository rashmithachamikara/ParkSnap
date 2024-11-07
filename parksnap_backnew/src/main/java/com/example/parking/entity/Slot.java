package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.web.WebProperties;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="Slot")
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    public int slotId;

    @ManyToOne
    @JoinColumn(name = "lotId")
    private Lot lot;

    @ManyToOne
    @JoinColumn(name = "typeId")
    private SlotType slotType;


    public Integer getId() {
        return slotId;
    }
    public void setId(Integer slotId) {
        this.slotId = slotId;
    }
}
