package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.HomeworkQuiz;

import java.util.List;

public interface HomeWorkQuizMapper {
    List<HomeworkQuiz> findBySectionId(int sectionId);
}
