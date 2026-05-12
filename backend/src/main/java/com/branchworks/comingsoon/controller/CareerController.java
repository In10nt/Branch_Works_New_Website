package com.branchworks.comingsoon.controller;

import com.branchworks.comingsoon.model.Career;
import com.branchworks.comingsoon.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CareerController {
    
    @Autowired
    private CareerService careerService;
    
    // Public endpoint - get active careers for website
    @GetMapping("/careers")
    public List<Career> getActiveCareers() {
        return careerService.getActiveCareers();
    }
    
    // Admin endpoints
    @GetMapping("/admin/careers")
    public List<Career> getAllCareers() {
        return careerService.getAllCareers();
    }
    
    @GetMapping("/admin/careers/{id}")
    public ResponseEntity<Career> getCareerById(@PathVariable Long id) {
        return careerService.getCareerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/admin/careers")
    public Career createCareer(@RequestBody Career career) {
        return careerService.createCareer(career);
    }
    
    @PutMapping("/admin/careers/{id}")
    public ResponseEntity<Career> updateCareer(@PathVariable Long id, @RequestBody Career careerDetails) {
        try {
            Career updatedCareer = careerService.updateCareer(id, careerDetails);
            return ResponseEntity.ok(updatedCareer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/admin/careers/{id}")
    public ResponseEntity<Void> deleteCareer(@PathVariable Long id) {
        careerService.deleteCareer(id);
        return ResponseEntity.ok().build();
    }
}
