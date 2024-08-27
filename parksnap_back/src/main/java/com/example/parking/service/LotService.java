package com.example.parking.service;

import com.example.parking.dto.LotDTO;
import com.example.parking.entity.Lot;
import com.example.parking.repo.LotRepo;
import com.example.parking.util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Character.getType;

@Service
@Transactional
public class LotService {
    @Autowired
    private LotRepo lotRepo;

    @Autowired
    private ModelMapper modelMapper;

    public String saveLot(LotDTO lotDTO){
        if(lotRepo.existsById(lotDTO.getLotID())){
            return VarList.RSP_DUPLICATED;
        }else{
            lotRepo.save(modelMapper.map(lotDTO, Lot.class));
            return VarList.RSP_SUCCESS;

        }
    }
    public String updateLot(LotDTO lotDTO){
        if(lotRepo.existsById(lotDTO.getLotID())){
            lotRepo.save(modelMapper.map(lotDTO,Lot.class));
            return VarList.RSP_SUCCESS;
        }else{
            return VarList.RSP_NO_DATA_FOUND;

        }
    }
    public List<LotDTO> getAllLot(){
        List<Lot> lotList = lotRepo.findAll();
        return modelMapper.map(lotList, new TypeToken<ArrayList<LotDTO>>(){

        }.getType());
    }
    public String deleteLot(int lotID){
        if (lotRepo.existsById(lotID)){
            lotRepo.deleteById(lotID);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
