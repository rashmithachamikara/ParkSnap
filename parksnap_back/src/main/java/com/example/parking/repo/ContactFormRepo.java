package com.example.parking.repo;

import com.example.parking.entity.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactFormRepo extends JpaRepository<ContactForm, Integer> {
}
