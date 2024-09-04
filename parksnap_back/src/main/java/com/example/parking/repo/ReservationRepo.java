package com.example.parking.repo;

import com.example.parking.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepo extends JpaRepository<Reservation, Integer> {

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Reservation r WHERE r.slot.id = :slotId")
    boolean existsBySlotId(@Param("slotId") Integer slotId);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.slot.lot.id = :lotId")
    long countOccupiedSlotsByLotId(@Param("lotId") Integer lotId);



}
