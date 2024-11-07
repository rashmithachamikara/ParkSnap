package com.example.parking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

@Table(name = "contactForm")

public class ContactForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userCode;

    private String userName;
    private String userEmail;
    private String userPhone;
    private String userMessage;
}
