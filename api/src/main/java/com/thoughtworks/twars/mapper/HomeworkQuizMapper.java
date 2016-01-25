package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.HomeworkQuiz;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HomeworkQuizMapper {
    List<HomeworkQuiz> findBySectionId(int id);

    HomeworkQuiz findById(int id);

    int updateHomeworkQuiz(
            @Param("id") int id,
            @Param("sectionId") int sectionId);
}
