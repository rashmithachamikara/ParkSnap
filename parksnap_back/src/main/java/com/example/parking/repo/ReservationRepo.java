package com.example.parking.repo;

import com.example.parking.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation, Integer> {

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Reservation r WHERE r.slot.id = :slotId")
    boolean existsBySlotId(@Param("slotId") Integer slotId);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN TRUE ELSE FALSE END " +
            "FROM Reservation r WHERE r.slot.id = :slotId AND r.startTime BETWEEN :startOfDay AND :endOfDay")
    boolean existsBySlotIdAndStartTimeBetween(@Param("slotId") Integer slotId,
                                              @Param("startOfDay") LocalDateTime startOfDay,
                                              @Param("endOfDay") LocalDateTime endOfDay);


    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.slot.lot.id = :lotId")
    long countOccupiedSlotsByLotId(@Param("lotId") Integer lotId);

    @Query(value = "SELECT u.user_id,u.name, u.username, u.phone_no, r.start_time, r.reservation_id, v.license_plate " +
            "FROM Slot s " +
            "LEFT JOIN Reservation r " +
            "ON s.slot_id=r.slot_id " +
            "LEFT JOIN User u " +
            "ON r.user_id=u.user_id " +
            "LEFT JOIN Vehicle v " +
            "ON r.vehicle_id=v.vehicle_id " +
            "WHERE s.slot_id=?1 AND DATE(r.start_time)=CURDATE()",nativeQuery = true)
    List<Object[]> findReservationDetailsBySlotId(@Param("slotId") int slotId);

    @Query(value = "SELECT DAYNAME(start_time) AS day_of_week, COUNT(*) AS reservation_count " +
            "FROM reservation " +
            "WHERE start_time BETWEEN :startDate AND :endDate " +
            "GROUP BY day_of_week " +
            "ORDER BY FIELD(DAYNAME(start_time), 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')",
            nativeQuery = true)
    List<Object[]> findReservationCountByDayOfWeek(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query(value = "SELECT DATE(start_time) AS reservation_date, COUNT(*) AS reservation_count " +
            "FROM reservation " +
            "WHERE start_time BETWEEN :startDate AND :endDate " +
            "GROUP BY reservation_date " +
            "ORDER BY reservation_date ASC",
            nativeQuery = true)
    List<Object[]> findReservationCountByDay(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

}
