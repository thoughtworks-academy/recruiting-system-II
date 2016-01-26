package com.thoughtworks.twars.service.quiz.definition;

import com.thoughtworks.twars.bean.HomeworkQuiz;
import com.thoughtworks.twars.bean.Section;
import com.thoughtworks.twars.mapper.HomeworkQuizMapper;
import com.thoughtworks.twars.mapper.SectionMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.inject.Inject;

public class HomeworkQuizDefinition implements IQuizDefinition {

    @Inject
    HomeworkQuizMapper mapper;

    @Inject
    SectionMapper sectionMapper;

    public void setMapper(HomeworkQuizMapper mapper) {
        this.mapper = mapper;
    }

    public void setSectionMapper(SectionMapper sectionMapper) {
        this.sectionMapper = sectionMapper;
    }

    @Override
    public int insertQuizDefinition(Map quiz, String decription, int paperId) {

        Section section = new Section();
        section.setPaperId(paperId);
        section.setDescription(decription);
        section.setType((String) quiz.get("quizType"));

        sectionMapper.insertSection(section);

        mapper.updateHomeworkQuiz((Integer) quiz.get("quizId"),section.getId());

        return paperId;
    }

    @Override
    public List<Map> getQuizDefinition(int sectionId) {
        List<HomeworkQuiz> list = mapper.findBySectionId(sectionId);

        return list.stream()
                .map(v -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", v.getId());
                    map.put("definition_uri", "homeworkQuizzes/" + v.getId());
                    return map;
                })
                .collect(Collectors.toList());
    }
}
