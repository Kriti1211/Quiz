package com.example.quizapp.controller;

import com.example.quizapp.model.Question;
import com.example.quizapp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping(value = "/questions", produces = "application/json")
    public List<Question> getQuestions() {
        return quizService.getQuestions();
    }
}