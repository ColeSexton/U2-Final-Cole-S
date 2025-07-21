package com.example.U2_final_backend.dto;

import com.example.U2_final_backend.models.PersonalInfo;
import com.example.U2_final_backend.models.SongFormInfo;

public class SongFormSubmissionDTO {
    private PersonalInfo personalInfo;
    private SongFormInfo songFormInfo;

    public PersonalInfo getPersonalInfo() {
        return personalInfo;
    }
    public void setPersonalInfo(PersonalInfo personalInfo) {
        this.personalInfo = personalInfo;
    }

    public SongFormInfo getSongFormInfo() {
        return songFormInfo;
    }

    public void setSongFormInfo(SongFormInfo songFormInfo) {
        this.songFormInfo = songFormInfo;
    }

}
