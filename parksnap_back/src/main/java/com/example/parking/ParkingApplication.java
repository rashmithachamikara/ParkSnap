package com.example.parking;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ParkingApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParkingApplication.class, args);
		System.out.println("Swagger Address: http://localhost:8080/swagger-ui/index.html");
	}

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

}
