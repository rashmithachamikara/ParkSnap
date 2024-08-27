package com.example.parking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    public int userID;
    public String name;
    public String phoneno;
    public String username;
    public String password;
}
