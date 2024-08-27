package com.example.parking.repo;


import com.example.parking.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlotRepo extends JpaRepository<Slot, Integer> {
}
