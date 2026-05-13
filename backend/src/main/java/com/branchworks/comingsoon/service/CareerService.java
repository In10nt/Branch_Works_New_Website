package com.branchworks.comingsoon.service;

import com.branchworks.comingsoon.model.Career;
import com.branchworks.comingsoon.repository.CareerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CareerService {
    
    @Autowired
    private CareerRepository careerRepository;
    
    public List<Career> getAllCareers() {
        return careerRepository.findAll();
    }
    
    public List<Career> getActiveCareers() {
        return careerRepository.findByStatusOrderByCreatedAtDesc("ACTIVE");
    }
    
    public List<Career> getCareersByDepartment(String department) {
        return careerRepository.findByDepartment(department);
    }
    
    public Optional<Career> getCareerById(Long id) {
        return careerRepository.findById(id);
    }
    
    public Career createCareer(Career career) {
        return careerRepository.save(career);
    }
    
    public Career updateCareer(Long id, Career careerDetails) {
        Career career = careerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Career not found with id: " + id));
        
        career.setTitle(careerDetails.getTitle());
        career.setLocation(careerDetails.getLocation());
        career.setWorkType(careerDetails.getWorkType());
        career.setDepartment(careerDetails.getDepartment());
        career.setLinkedinUrl(careerDetails.getLinkedinUrl());
        career.setStatus(careerDetails.getStatus());
        
        return careerRepository.save(career);
    }
    
    public void deleteCareer(Long id) {
        careerRepository.deleteById(id);
    }
}
