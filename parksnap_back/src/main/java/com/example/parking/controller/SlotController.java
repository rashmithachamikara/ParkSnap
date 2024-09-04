package com.example.parking.controller;

import com.example.parking.dto.SlotStatusDTO;
import com.example.parking.entity.Slot;
import com.example.parking.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/slots")
public class SlotController {

    @Autowired
    private SlotService slotService;

    // Endpoint to get the number of occupied slots by lot ID
    @GetMapping("/lot/{lotId}/occupiedCount")
    public long getOccupiedSlotsCount(@PathVariable Integer lotId) {
        return slotService.getOccupiedSlotsCount(lotId);
    }

    // Endpoint to get the number of remaining slots by lot ID
    @GetMapping("/lot/{lotId}/remaining")
    public int getRemainingSlots(@PathVariable Integer lotId) {
        return slotService.getRemainingSlots(lotId);
    }

    // Endpoint to get all slots by lot ID
    @GetMapping("/lot/{lotId}/totalCount")
    public long getTotalSlotsCount(@PathVariable Integer lotId) {
        return slotService.getTotalSlotsCount(lotId);
    }

    @GetMapping("/lot/{lotId}/status")
    public List<SlotStatusDTO> getSlotAvailabilityStatus(@PathVariable Integer lotId) {
        return slotService.getSlotAvailabilityStatus(lotId);
    }
}
