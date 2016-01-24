package com.thoughtworks.twars.service.quiz.definition;

import java.util.List;
import java.util.Map;

public interface IQuizDefinition {

    public void insertQuizDefinition(Map definition);

    public List<Map> getQuizDefinition(int sectionId);
}
