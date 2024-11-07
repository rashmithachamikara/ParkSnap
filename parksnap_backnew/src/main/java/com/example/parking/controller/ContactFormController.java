package com.example.parking.controller;

import com.example.parking.dto.ResponseDTO;
import com.example.parking.dto.ContactFormDTO;
import com.example.parking.service.ContactFormService;
import com.example.parking.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/contactForm")
public class ContactFormController {


    @Autowired
    private ContactFormService contactFormService;

    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping(value = "/saveContactForm")
    public ResponseEntity saveContactForm(@RequestBody ContactFormDTO contactformDTO) {
        try {
            String res = contactFormService.saveContactForm(contactformDTO);
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAllcontactForms")
    public ResponseEntity getAllContactForms() {
        try {
            List<ContactFormDTO> contactFormDTOList = contactFormService.getAllContactForms();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Success!");
            responseDTO.setContent(contactFormDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);

        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
