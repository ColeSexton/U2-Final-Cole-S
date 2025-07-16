package com.example.U2_final_backend.models;

import jakarta.persistence.*;

@Entity
public class SynthWav {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "wav_file", columnDefinition = "LONGBLOB")
    private byte[] wavFile;

    public SynthWav() {
    }

    public SynthWav(String title, byte[] wavFile) {
        this.title = title;
        this.wavFile = wavFile;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public byte[] getWavFile() {
        return wavFile;
    }
    public void setWavFile(byte[] wavFile) {
        this.wavFile = wavFile;
    }
}
