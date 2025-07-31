package com.example.U2_final_backend.repositories;

import com.example.U2_final_backend.models.SongFormInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongFormInfoRepository extends JpaRepository<SongFormInfo, Integer> {
    SongFormInfo findByPersonalInfoId(int personalInfoId);
}
