package com.example.parking.repo;

import com.example.parking.entity.Lot;
import com.example.parking.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepo extends JpaRepository<Vehicle, String> {
}
