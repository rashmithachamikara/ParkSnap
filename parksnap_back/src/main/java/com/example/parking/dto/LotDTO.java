package com.example.parking.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LotDTO {
    private int lotId;
    private String location;
    private int noOfSlots;
}
