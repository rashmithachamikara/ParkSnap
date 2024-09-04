package com.example.parking.repo;


import com.example.parking.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SlotRepo extends JpaRepository<Slot, Integer> {
    @Query("SELECT COUNT(s) FROM Slot s WHERE s.lot.id = :lotId")
    long countAllSlotsByLotId(@Param("lotId") Integer lotId);

    @Query("SELECT s FROM Slot s WHERE s.lot.id = :lotId")
    List<Slot> findAllByLotId(@Param("lotId") Integer lotId);
}
