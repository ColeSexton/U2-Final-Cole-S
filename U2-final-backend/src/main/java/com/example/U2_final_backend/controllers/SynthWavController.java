package com.example.U2_final_backend.controllers;

import com.example.U2_final_backend.models.SynthWav;
import com.example.U2_final_backend.repositories.SynthWavRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/synth-wav")
public class SynthWavController {

    @Autowired
    private SynthWavRepository synthWavRepository;

    @GetMapping
    public List<SynthWav> getAll() {
        return synthWavRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadWav(@PathVariable int id) {
        SynthWav wav = synthWavRepository.findById(id).orElse(null);
        if (wav == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + wav.getTitle() + ".wav")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(wav.getWavFile());
    }

    @PostMapping
    public SynthWav uploadWav(@RequestParam("title") String title,
                              @RequestParam("file") MultipartFile file) throws IOException {
        SynthWav wav = new SynthWav(title, file.getBytes());
        return synthWavRepository.save(wav);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        synthWavRepository.deleteById(id);
    }
}