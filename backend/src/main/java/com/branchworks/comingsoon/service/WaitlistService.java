package com.branchworks.comingsoon.service;

import com.branchworks.comingsoon.dto.WaitlistRequest;
import com.branchworks.comingsoon.dto.WaitlistResponse;
import com.branchworks.comingsoon.model.WaitlistEntry;
import com.branchworks.comingsoon.repository.WaitlistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class WaitlistService {

    private final WaitlistRepository waitlistRepository;
    private final EmailService emailService;

    @Transactional
    public WaitlistResponse addToWaitlist(WaitlistRequest request) {
        log.info("Adding new entry to waitlist: {}", request.getName());
        
        WaitlistEntry entry = new WaitlistEntry();
        entry.setName(request.getName());
        entry.setCompany(request.getCompany());
        entry.setCompanySize(request.getCompanySize());
        entry.setMessage(request.getMessage());
        
        WaitlistEntry savedEntry = waitlistRepository.save(entry);
        log.info("Successfully added entry with ID: {}", savedEntry.getId());
        
        // Send email notification asynchronously - don't block response
        new Thread(() -> {
            try {
                emailService.sendWaitlistNotification(request);
            } catch (Exception e) {
                log.error("Email notification failed but entry was saved: {}", e.getMessage());
            }
        }).start();
        
        return mapToResponse(savedEntry);
    }

    @Transactional(readOnly = true)
    public List<WaitlistResponse> getAllEntries() {
        log.info("Fetching all waitlist entries");
        return waitlistRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public long getTotalCount() {
        return waitlistRepository.count();
    }

    @Transactional(readOnly = true)
    public long getCountByCompanySize(String companySize) {
        return waitlistRepository.countByCompanySize(companySize);
    }

    private WaitlistResponse mapToResponse(WaitlistEntry entry) {
        return new WaitlistResponse(
                entry.getId(),
                entry.getName(),
                entry.getCompany(),
                entry.getCompanySize(),
                entry.getMessage(),
                entry.getCreatedAt()
        );
    }
}