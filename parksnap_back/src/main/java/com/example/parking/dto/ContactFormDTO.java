package com.example.parking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ContactFormDTO {
    private int userCode;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String userMessage;
}


