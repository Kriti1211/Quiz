package com.example.quizapp.controller;

import com.example.quizapp.model.Question;
import com.example.quizapp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Get all questions
    @GetMapping
    public List<Question> getQuestions() {
        return quizService.getQuestions();
    }

    // Add a new question
    @PostMapping
    public Question addQuestion(@RequestBody Question question) {
        return quizService.addQuestion(question);
    }

    // Update an existing question
    @PutMapping("/{id}")
    public Question updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        return quizService.updateQuestion(id, question);
    }

    // Delete a question
    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        quizService.deleteQuestion(id);
    }
}