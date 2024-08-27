package com.example.parking.repo;

import com.example.parking.entity.Lot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LotRepo extends JpaRepository<Lot, Integer> {
}
