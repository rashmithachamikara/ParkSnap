package com.example.parking.repo;

import com.example.parking.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehicleRepo extends JpaRepository<Vehicle, String> {
    @Query("SELECT v FROM Vehicle v WHERE v.user.userId = :userId")
    List<Vehicle> getVehiclesByUserId(@Param("userId") int userId);
}
