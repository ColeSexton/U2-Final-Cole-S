package com.example.U2_final_backend.controllers;

import com.example.U2_final_backend.models.PersonalInfo;
import com.example.U2_final_backend.repositories.PersonalInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personal-info")
public class PersonalInfoController {

    @Autowired
    private PersonalInfoRepository personalInfoRepository;

    @GetMapping
    public List<PersonalInfo> getAllPersonalInfo() {
        return personalInfoRepository.findAll();
    }

    @GetMapping("/{id}")
    public PersonalInfo getPersonalInfoById(@PathVariable int id) {
        return personalInfoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public PersonalInfo createPersonalInfo (@RequestBody PersonalInfo personalInfo) {
        return personalInfoRepository.save(personalInfo);
    }

    @PutMapping("/{id}")
    public PersonalInfo updatePersonalInfo(@PathVariable int id, @RequestBody PersonalInfo personalInfo) {
        if (personalInfoRepository.existsById(id)) {
            personalInfo.setId(id);
            return personalInfoRepository.save(personalInfo);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deletePersonalInfo(@PathVariable int id) {
        personalInfoRepository.deleteById(id);
    }

}
