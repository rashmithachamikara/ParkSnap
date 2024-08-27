package com.example.parking.controller;

import com.example.parking.dto.LotDTO;
import com.example.parking.dto.ResponseDTO;
import com.example.parking.service.LotService;
import com.example.parking.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/lot")
public class LotController {

    @Autowired
    private LotService lotService;

    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping(value = "/saveLot")
    public ResponseEntity saveLot(@RequestBody LotDTO lotDTO){
        try{
            String res = lotService.saveLot(lotDTO);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("success");
                responseDTO.setContent(lotDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else if (res.equals("06")){
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("Lot Registered");
                responseDTO.setContent(lotDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }else{
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            }
        }catch(Exception ex){

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping(value = "/updateLot")
    public ResponseEntity updateLot(@RequestBody LotDTO lotDTO){
        try{
            String res = lotService.updateLot(lotDTO);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("success");
                responseDTO.setContent(lotDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else if (res.equals("01")){
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("not registered Lot");
                responseDTO.setContent(lotDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }else{
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            }
        }catch(Exception ex){

            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/getAllLots")
    public ResponseEntity getAllLots(){
        try{
            List<LotDTO> lotDTOList = lotService.getAllLot();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("success");
            responseDTO.setContent(lotDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);


        }catch(Exception ex){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
    @DeleteMapping("/deleteLot/{lotID}")
    public ResponseEntity deleteLot(@PathVariable int lotID){
        try {
            String res = lotService.deleteLot(lotID);
            if (res.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            } else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No lot available for this lotID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(e);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
