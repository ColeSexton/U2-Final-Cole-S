package com.example.U2_final_backend.converters;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;

@Converter
public class StringListConverter  implements AttributeConverter<List<String>, String> {

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<String> list){
        try{
            return mapper.writeValueAsString(list);
        } catch (Exception e) {
            throw new RuntimeException("Error converting list to JSON string", e);

        }


    }

    @Override
    public List<String> convertToEntityAttribute(String json) {
        try{
            return mapper.readValue(json, new TypeReference<List<String>>(){} );
        }catch (Exception e){
            throw new RuntimeException("Error converting JSON string to list", e);
        }

    }



}
