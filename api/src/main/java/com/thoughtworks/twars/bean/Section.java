package com.thoughtworks.twars.bean;

import java.util.List;

public class Section {
    private int id;
    private int paperId;
    private String description;
    private String type;
    private List<Integer> quizId;

    public int getPaperId() {
        return paperId;
    }

    public void setPaperId(int paperId) {
        this.paperId = paperId;
    }

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Integer> getQuizId() {
        return quizId;
    }

    public void setQuizId(List<Integer> quizId) {
        this.quizId = quizId;
    }
}
