package com.example.parking.dto;

import com.example.parking.entity.UserType;
import com.example.parking.entity.Vehicle;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    public int userId;
    public String name;
    public String phoneNo;
    public String username;
    //public String password;
    public int typeId;
}