package com.thoughtworks.twars.bean;

public class HomeworkQuizItem {
    int id;
    String description;
    String evaluateScript;
    String evaluateRepository;
    String templateRepository;
    int homeworkQuizId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEvaluateScript() {
        return evaluateScript;
    }

    public void setEvaluateScript(String evaluateScript) {
        this.evaluateScript = evaluateScript;
    }

    public String getEvaluateRepository() {
        return evaluateRepository;
    }

    public void setEvaluateResository(String evaluateResository) {
        this.evaluateRepository = evaluateRepository;
    }

    public String getTemplateRepository() {
        return templateRepository;
    }

    public void setTemplateRepository(String templateRepository) {
        this.templateRepository = templateRepository;
    }

    public int getHomeworkQuizId() {
        return homeworkQuizId;
    }

    public void setHomeworkQuizId(int homeworkQuizId) {
        this.homeworkQuizId = homeworkQuizId;
    }
}
