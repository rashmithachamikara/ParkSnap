package com.example.parking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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