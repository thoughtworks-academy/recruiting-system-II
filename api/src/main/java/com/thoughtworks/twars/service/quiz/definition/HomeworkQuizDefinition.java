package com.thoughtworks.twars.service.quiz.definition;

import com.thoughtworks.twars.bean.HomeworkQuiz;
import com.thoughtworks.twars.mapper.HomeworkQuizMapper;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class HomeworkQuizDefinition implements IQuizDefinition {

    @Inject
    HomeworkQuizMapper mapper;

    public void setMapper(HomeworkQuizMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void insertQuizDefinition(Map definition) {

    }

    @Override
    public List<Map> getQuizDefinition(int sectionId) {
        List<HomeworkQuiz> list = mapper.findBySectionId(sectionId);

        return list.stream()
                .map(v -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", v.getId());
                    map.put("definition-uri", "homeworkQuizzes/" + v.getId());
                    return map;
                })
                .collect(Collectors.toList());
    }
}
