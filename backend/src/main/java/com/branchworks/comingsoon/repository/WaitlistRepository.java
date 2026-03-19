package com.branchworks.comingsoon.repository;

import com.branchworks.comingsoon.model.WaitlistEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaitlistRepository extends JpaRepository<WaitlistEntry, Long> {
    
    List<WaitlistEntry> findAllByOrderByCreatedAtDesc();
    
    long countByCompanySize(String companySize);
}