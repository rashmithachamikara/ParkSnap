package com.example.parking.controller;

import com.example.parking.dto.ResponseDTO;
import com.example.parking.dto.ContactFormDTO;
import com.example.parking.service.ContactFormService;
import com.example.parking.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/contactForm")
public class ContactFormController {


    @Autowired
    private ContactFormService contactFormService;

    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping(value = "/saveContactForm")
    public ResponseEntity saveContactForm(@RequestBody ContactFormDTO contactformDTO) {
        try{
            String res=contactFormService.saveContactForm(contactformDTO);
            if (res.equals("00")) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success!");
                responseDTO.setContent(contactformDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("ERROR!");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);

            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);

        }
}
}
