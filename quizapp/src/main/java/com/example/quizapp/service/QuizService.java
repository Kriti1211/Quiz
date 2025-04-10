package com.example.quizapp.service;

import com.example.quizapp.model.Question;
import com.example.quizapp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuestionRepository questionRepository;

    // Fetch all questions
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    // Add a new question
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    // Update an existing question
    public Question updateQuestion(Long id, Question updatedQuestion) {
        Optional<Question> existingQuestion = questionRepository.findById(id);
        if (existingQuestion.isPresent()) {
            Question question = existingQuestion.get();
            question.setQuestion(updatedQuestion.getQuestion());
            question.setOptions(updatedQuestion.getOptions());
            question.setCorrectAnswer(updatedQuestion.getCorrectAnswer());
            return questionRepository.save(question);
        } else {
            throw new RuntimeException("Question not found with id: " + id);
        }
    }

    // Delete a question
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}