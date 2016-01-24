package com.thoughtworks.twars.service.quiz.definition;

import com.thoughtworks.twars.bean.BlankQuiz;
import com.thoughtworks.twars.mapper.BlankQuizMapper;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BlankQuizDefinition implements IQuizDefinition {

    @Inject
    BlankQuizMapper blankQuizMapper;

    public void setBlankQuizMapper(BlankQuizMapper blankQuizMapper) {
        this.blankQuizMapper = blankQuizMapper;
    }

    @Override
    public void insertQuizDefinition(Map definition) {

    }

    @Override
    public List<Map> getQuizDefinition(int sectionId) {

        List<BlankQuiz> list = blankQuizMapper.findBySectionId(sectionId);

        return list.stream()
                .map(b -> {
                    HashMap<String, Object> item = new HashMap<>();
                    item.put("id", b.getId());
                    item.put("definition-uri", "blankQuizzes/" + b.getId());
                    item.put("items-uri", "blankQuizzes/" + b.getId() + "/items");
                    return item;
                })
                .collect(Collectors.toList());
    }
}
