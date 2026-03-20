package com.branchworks.comingsoon.controller;

import com.branchworks.comingsoon.dto.WaitlistRequest;
import com.branchworks.comingsoon.dto.WaitlistResponse;
import com.branchworks.comingsoon.service.WaitlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/waitlist")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "${cors.allowed.origins}")
public class WaitlistController {

    private final WaitlistService waitlistService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addToWaitlist(@Valid @RequestBody WaitlistRequest request) {
        log.info("Received waitlist request from: {}", request.getName());
        
        try {
            WaitlistResponse response = waitlistService.addToWaitlist(request);
            
            Map<String, Object> result = new HashMap<>();
            result.put("success", true);
            result.put("message", "Successfully joined the waitlist!");
            result.put("data", response);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (Exception e) {
            log.error("Error adding to waitlist", e);
            
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Failed to join waitlist. Please try again.");
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<List<WaitlistResponse>> getAllEntries() {
        log.info("Fetching all waitlist entries");
        List<WaitlistResponse> entries = waitlistService.getAllEntries();
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getCount() {
        log.info("Fetching waitlist count");
        Map<String, Long> count = new HashMap<>();
        count.put("total", waitlistService.getTotalCount());
        return ResponseEntity.ok(count);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        log.info("Fetching waitlist statistics");
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", waitlistService.getTotalCount());
        
        Map<String, Long> bySize = new HashMap<>();
        bySize.put("0-5", waitlistService.getCountByCompanySize("0 - 5"));
        bySize.put("6-20", waitlistService.getCountByCompanySize("6 - 20"));
        bySize.put("21-50", waitlistService.getCountByCompanySize("21 - 50"));
        bySize.put("51-200", waitlistService.getCountByCompanySize("51 - 200"));
        bySize.put("200+", waitlistService.getCountByCompanySize("200+"));
        
        stats.put("byCompanySize", bySize);
        
        return ResponseEntity.ok(stats);
    }
}