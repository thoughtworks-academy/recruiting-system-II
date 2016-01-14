package com.thoughtworks.twars.mapper;

import java.util.List;

public interface HomeWorkQuizMapper {
    List<HomeworkQuiz> findBySectionId(int sectionId);
}
