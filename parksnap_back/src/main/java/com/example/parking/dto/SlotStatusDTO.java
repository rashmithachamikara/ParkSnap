package com.example.parking.dto;

public class SlotStatusDTO {
    private Integer slotId;
    private boolean isReserved;

    public SlotStatusDTO(Integer slotId, boolean isReserved) {
        this.slotId = slotId;
        this.isReserved = isReserved;
    }

    public Integer getSlotId() {
        return slotId;
    }

    public void setSlotId(Integer slotId) {
        this.slotId = slotId;
    }

    public boolean isReserved() {
        return isReserved;
    }

    public void setReserved(boolean reserved) {
        isReserved = reserved;
    }
}
