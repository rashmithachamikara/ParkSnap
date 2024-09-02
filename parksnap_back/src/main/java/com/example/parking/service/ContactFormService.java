package com.example.parking.service;

import com.example.parking.dto.ContactFormDTO;
import com.example.parking.entity.ContactForm;
import com.example.parking.repo.ContactFormRepo;
import com.example.parking.util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ContactFormService {
    @Autowired
    private ContactFormRepo contactformRepo;

    @Autowired
    private ModelMapper modelMapper;

        public String saveContactForm(ContactFormDTO contactformDTO) {
            if (contactformRepo.existsById(contactformDTO.getUserCode())) {
                return VarList.RSP_DUPLICATED;
            } else {
                contactformRepo.save(modelMapper.map(contactformDTO, ContactForm.class));
                return VarList.RSP_SUCCESS;
            }
        }
}





