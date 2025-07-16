package com.example.U2_final_backend.models;

import jakarta.persistence.*;

@Entity
public class SongFormInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "personal_info_id")
    private int personalInfoId;

    @Column(name = "title")
    private String title;

    @Column(name = "genre")
    private String genre;

    @Column(name = "style")
    private String style;

    @Column(name = "instruments")
    private String instruments;

    @Column(name = "lyrics_inlcuded")
    private boolean lyricsIncluded;

    @Column(name = "lyrics_text")
    private String lyricsText;

    @Column(name = "length")
    private int length;

    @Column(name = "forSomeone")
    private boolean forSomeone;

    @Column(name = "for_someone_explain")
    private String forSomeoneExplain;

    @Column(name = "emotions")
    private String emotions;

    @Column(name = "extra_info")
    private String extraInfo;

    @Column(name = "bounce")
    private String bounce;

    public SongFormInfo() {
    }

    public SongFormInfo(int personalInfoId, String title, String genre, String style, String instruments, boolean lyricsIncluded, String lyricsText, int length, boolean forSomeone, String forSomeoneExplain, String emotions, String extraInfo, String bounce) {
        this.personalInfoId = personalInfoId;
        this.title = title;
        this.genre = genre;
        this.style = style;
        this.instruments = instruments;
        this.lyricsIncluded = lyricsIncluded;
        this.lyricsText = lyricsText;
        this.length = length;
        this.forSomeone = forSomeone;
        this.forSomeoneExplain = forSomeoneExplain;
        this.emotions = emotions;
        this.extraInfo = extraInfo;
        this.bounce = bounce;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getPersonalInfoId() {
        return personalInfoId;
    }
    public void setPersonalInfoId(int personalInfoId) {
        this.personalInfoId = personalInfoId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getGenre() {
        return genre;
    }
    public void setGenre(String genre) {
        this.genre = genre;
    }
    public String getStyle() {
        return style;
    }
    public void setStyle(String style) {
        this.style = style;
    }
    public String getInstruments() {
        return instruments;
    }
    public void setInstruments(String instruments) {
        this.instruments = instruments;
    }
    public boolean isLyricsIncluded() {
        return lyricsIncluded;
    }
    public void setLyricsIncluded(boolean lyricsIncluded) {
        this.lyricsIncluded = lyricsIncluded;
    }
    public String getLyricsText() {
        return lyricsText;
    }
    public void setLyricsText(String lyricsText) {
        this.lyricsText = lyricsText;
    }
    public int getLength() {
        return length;
    }
    public void setLength(int length) {
        this.length = length;
    }
    public boolean isForSomeone() {
        return forSomeone;
    }
    public void setForSomeone(boolean forSomeone) {
        this.forSomeone = forSomeone;
    }
    public String getForSomeoneExplain() {
        return forSomeoneExplain;
    }
    public void setForSomeoneExplain(String forSomeoneExplain) {
        this.forSomeoneExplain = forSomeoneExplain;
    }
    public String getEmotions() {
        return emotions;
    }
    public void setEmotions(String emotions) {
        this.emotions = emotions;
    }
    public String getExtraInfo() {
        return extraInfo;
    }
    public void setExtraInfo(String extraInfo) {
        this.extraInfo = extraInfo;
    }
    public String getBounce() {
        return bounce;
    }
    public void setBounce(String bounce) {
        this.bounce = bounce;
    }
}
