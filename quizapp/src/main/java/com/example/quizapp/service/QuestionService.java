package com.example.quizapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quizapp.model.Question;
import com.example.quizapp.repository.QuestionRepository;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepo;

    public List<Question> getAll() {
        return questionRepo.findAll();
    }

    public Question save(Question q) {
        return questionRepo.save(q);
    }
}
