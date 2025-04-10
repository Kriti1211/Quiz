package com.example.quizapp.service;

import com.example.quizapp.model.Question;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {
    public List<Question> getQuestions() {
        List<Question> questions = new ArrayList<>();
        questions.add(new Question("What is the capital of France?",
                new String[] { "Paris", "London", "Berlin", "Madrid" }, "Paris"));
        questions.add(new Question("What is 5 + 2?", new String[] { "7", "4", "1", "6" }, "7"));
        return questions;
    }
}