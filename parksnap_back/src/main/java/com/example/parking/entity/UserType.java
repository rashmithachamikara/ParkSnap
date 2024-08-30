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
@Table(name = "UserType")
public class UserType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int typeId;

    private String typeName;

    @OneToMany(mappedBy = "userType", cascade = CascadeType.ALL)
    private Set<User> users;
}