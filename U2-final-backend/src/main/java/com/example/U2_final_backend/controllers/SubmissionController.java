package com.example.U2_final_backend.controllers;


import com.example.U2_final_backend.dto.SongFormSubmissionDTO;
import com.example.U2_final_backend.models.PersonalInfo;
import com.example.U2_final_backend.models.SongFormInfo;
import com.example.U2_final_backend.repositories.PersonalInfoRepository;
import com.example.U2_final_backend.repositories.SongFormInfoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/submit")
@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {

    private final PersonalInfoRepository personalInfoRepo;
    private final SongFormInfoRepository songFormInfoRepo;

    public SubmissionController(PersonalInfoRepository personalInfoRepo, SongFormInfoRepository songFormInfoRepo) {
        this.personalInfoRepo = personalInfoRepo;
        this.songFormInfoRepo = songFormInfoRepo;
    }

    @PostMapping
    public ResponseEntity<SongFormSubmissionDTO> createSubmission(@RequestBody SongFormSubmissionDTO dto){
        PersonalInfo savedPersonalInfo = personalInfoRepo.save(dto.getPersonalInfo());

        SongFormInfo songFormInfo = dto.getSongFormInfo();

        songFormInfo.setPersonalInfo(savedPersonalInfo);

        SongFormInfo savedSongFormInfo = songFormInfoRepo.save(songFormInfo);

        dto.setPersonalInfo(savedPersonalInfo);
        dto.setSongFormInfo(savedSongFormInfo);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SongFormSubmissionDTO> updateSubmission(@PathVariable int id, @RequestBody SongFormSubmissionDTO dto){
        Optional<PersonalInfo> personalInfoOpt = personalInfoRepo.findById(id);

        Optional<SongFormInfo> songFormInfoOpt = Optional.ofNullable(songFormInfoRepo.findByPersonalInfoId(id));

        if(personalInfoOpt.isEmpty() || songFormInfoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        //update personal info
        PersonalInfo personalInfo = personalInfoOpt.get();
        PersonalInfo newPI = dto.getPersonalInfo();

        personalInfo.setName(newPI.getName());
        personalInfo.setEmail(newPI.getEmail());
        personalInfo.setPhone(newPI.getPhone());
        personalInfoRepo.save(personalInfo);

        //update song form info

        SongFormInfo songFormInfo = songFormInfoOpt.get();
        SongFormInfo newSFI = dto.getSongFormInfo();

        songFormInfo.setTitle(newSFI.getTitle());
        songFormInfo.setGenre(newSFI.getGenre());
        songFormInfo.setStyle(newSFI.getStyle());
        songFormInfo.setInstruments(newSFI.getInstruments());
        songFormInfo.setLyricsIncluded(newSFI.isLyricsIncluded());
        songFormInfo.setLyricsText(newSFI.getLyricsText());
        songFormInfo.setLength(newSFI.getLength());
        songFormInfo.setForSomeone(newSFI.isForSomeone());
        songFormInfo.setForSomeoneExplain(newSFI.getForSomeoneExplain());
        songFormInfo.setEmotions(newSFI.getEmotions());
        songFormInfo.setExtraInfo(newSFI.getExtraInfo());
        songFormInfo.setBounce(newSFI.getBounce());

        songFormInfoRepo.save(songFormInfo);

        dto.setPersonalInfo(personalInfo);
        dto.setSongFormInfo(songFormInfo);
        return ResponseEntity.ok(dto);

    }

    @GetMapping("/{id}")
    public ResponseEntity<SongFormSubmissionDTO> getSubmission(@PathVariable int id){
        Optional<PersonalInfo> personalInfoOpt = personalInfoRepo.findById(id);


        if(personalInfoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        SongFormInfo songFormInfo = songFormInfoRepo.findByPersonalInfoId(id);
        if (songFormInfo == null) {
            return ResponseEntity.notFound().build();
        }

        SongFormSubmissionDTO dto = new SongFormSubmissionDTO();
        dto.setPersonalInfo(personalInfoOpt.get());
        dto.setSongFormInfo(songFormInfo);

        return ResponseEntity.ok(dto);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubmission(@PathVariable int id) {
        Optional<PersonalInfo> personalInfoOpt = personalInfoRepo.findById(id);
        if(personalInfoOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        SongFormInfo relatedSongForm = songFormInfoRepo.findByPersonalInfoId(id);
        if(relatedSongForm != null) {
            songFormInfoRepo.delete(relatedSongForm);
        }

        personalInfoRepo.deleteById(id);

        return ResponseEntity.noContent().build();
    }


}
