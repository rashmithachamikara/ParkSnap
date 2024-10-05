package com.example.parking.service;

import com.example.parking.dto.SlotStatusDTO;
import com.example.parking.entity.Slot;
import com.example.parking.repo.ReservationRepo;
import com.example.parking.repo.SlotRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SlotService {
    @Autowired
    private SlotRepo slotRepo;

    @Autowired
    private ReservationRepo reservationRepo;

    // Get the total number of slots by lot ID
    public long getTotalSlotsCount(Integer lotId) {
        return slotRepo.countAllSlotsByLotId(lotId);
    }

    // Get the number of occupied slots by lot ID
    public long getOccupiedSlotsCount(Integer lotId) {
        return reservationRepo.countOccupiedSlotsByLotId(lotId);
    }

    // Calculate remaining slots
    public int getRemainingSlots(Integer lotId) {
        long totalSlots = getTotalSlotsCount(lotId);
        long occupiedSlots = getOccupiedSlotsCount(lotId);
        return (int) (totalSlots - occupiedSlots);
    }

    public List<SlotStatusDTO> getSlotAvailabilityStatus(Integer lotId) {
        List<Slot> slots = slotRepo.findAllByLotId(lotId);

        // Calculate the start and end of today
        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN); // Start of day: 00:00
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX).truncatedTo(ChronoUnit.SECONDS); // End of day: 23:59:59

        // Check if each slot is reserved for today
        return slots.stream().map(slot -> {
            boolean isReserved = reservationRepo.existsBySlotIdAndStartTimeBetween(slot.getId(), startOfDay, endOfDay);
            return new SlotStatusDTO(slot.getId(), isReserved);
        }).collect(Collectors.toList());
    }



}
