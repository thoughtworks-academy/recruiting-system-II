package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.QuizItem;

import java.util.List;

public interface QuizItemMapper {

    public List<QuizItem> getAllQuizItems();

    public int insertQuizItem(QuizItem quizItem);

    public QuizItem getQuizItemById(int id);

    public List<QuizItem> findByBlankQuizId(int blankQuizId);
}
