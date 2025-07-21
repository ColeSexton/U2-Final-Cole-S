package com.example.U2_final_backend.controllers;

import com.example.U2_final_backend.dto.SongFormSubmissionDTO;
import com.example.U2_final_backend.models.PersonalInfo;
import com.example.U2_final_backend.models.SongFormInfo;
import com.example.U2_final_backend.repositories.PersonalInfoRepository;
import com.example.U2_final_backend.repositories.SongFormInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/song-form")
public class SongFormInfoController {

    @Autowired
    private SongFormInfoRepository songFormInfoRepository;

    @Autowired
    private PersonalInfoRepository personalInfoRepository;

    @GetMapping
    public List<SongFormInfo> getAllSongFormInfo() {
        return songFormInfoRepository.findAll();
    }

    @GetMapping("/{id}")
    public SongFormInfo getSongFormInfoById(@PathVariable int id) {
        return songFormInfoRepository.findById(id).orElse(null);
    }

    //ensures that the personalInfo exists before creating a SongFormInfo
    @PostMapping
    public SongFormInfo createSongFormInfo(@RequestBody SongFormSubmissionDTO submissionDTO) {
        PersonalInfo personalInfo = submissionDTO.getPersonalInfo();

        // Check if personalInfo already exists by ID
        if(personalInfo.getId() != null){
            personalInfo = personalInfoRepository.findById(personalInfo.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "PersonalInfo not found"));
        } else{
            personalInfo = personalInfoRepository.save(personalInfo);
        }

        SongFormInfo songFormInfo = submissionDTO.getSongFormInfo();
        songFormInfo.setPersonalInfo(personalInfo);

        return songFormInfoRepository.save(songFormInfo);
    }


    @PutMapping("/{id}")
    public SongFormInfo updateSongFormInfo(@PathVariable int id, @RequestBody SongFormInfo songFormInfo) {
        if (songFormInfoRepository.existsById(id)) {
            songFormInfo.setId(id);
            return songFormInfoRepository.save(songFormInfo);
        }
        return null; // maybe throw an exception
    }

    @DeleteMapping("/{id}")
    public void deleteSongFormInfo(@PathVariable int id) {
        songFormInfoRepository.deleteById(id);
    }
}
