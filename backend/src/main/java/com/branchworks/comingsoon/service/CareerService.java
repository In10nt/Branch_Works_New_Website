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
        return careerRepository.findByActiveOrderByCreatedAtDesc(true);
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
        career.setDescription(careerDetails.getDescription());
        career.setLocation(careerDetails.getLocation());
        career.setType(careerDetails.getType());
        career.setExperience(careerDetails.getExperience());
        career.setSalary(careerDetails.getSalary());
        career.setSkills(careerDetails.getSkills());
        career.setResponsibilities(careerDetails.getResponsibilities());
        career.setQualifications(careerDetails.getQualifications());
        career.setActive(careerDetails.getActive());
        
        return careerRepository.save(career);
    }
    
    public void deleteCareer(Long id) {
        careerRepository.deleteById(id);
    }
}
