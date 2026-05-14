package com.branchworks.comingsoon.repository;

import com.branchworks.comingsoon.model.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
    List<Career> findByActiveOrderByCreatedAtDesc(Boolean active);
}
