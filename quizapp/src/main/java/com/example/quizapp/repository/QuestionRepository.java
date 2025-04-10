package com.example.quizapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.example.quizapp.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByDomain(String domain);

}
