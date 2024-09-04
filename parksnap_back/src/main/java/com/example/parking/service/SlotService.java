package com.example.parking.service;

import com.example.parking.dto.SlotStatusDTO;
import com.example.parking.entity.Slot;
import com.example.parking.repo.ReservationRepo;
import com.example.parking.repo.SlotRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        // Check if each slot has an associated reservation
        return slots.stream().map(slot -> {
            boolean isReserved = reservationRepo.existsBySlotId(slot.getId());
            return new SlotStatusDTO(slot.getId(), isReserved);
        }).collect(Collectors.toList());
    }



}
