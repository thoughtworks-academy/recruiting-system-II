package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.HomeworkQuiz;
import com.thoughtworks.twars.bean.HomeworkQuizItem;

import java.util.List;

public interface HomeworkQuizItemMapper {
    List<HomeworkQuizItem> findByHomeworkQuizId(int homeworkQuizId);
}
