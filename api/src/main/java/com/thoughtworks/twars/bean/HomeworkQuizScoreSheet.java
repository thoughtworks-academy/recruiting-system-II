package com.thoughtworks.twars.bean;

public class HomeworkQuizScoreSheet {
    private int id;
    private int examerId;
    private int paperId;
    private int homeworkQuizId;
    private int homeworkQuizItemId;
    private String githubAddress;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getExamerId() {
        return examerId;
    }

    public void setExamerId(int examerId) {
        this.examerId = examerId;
    }

    public int getPaperId() {
        return paperId;
    }

    public void setPaperId(int paperId) {
        this.paperId = paperId;
    }

    public int getHomeworkQuizId() {
        return homeworkQuizId;
    }

    public void setHomeworkQuizId(int homeworkQuizId) {
        this.homeworkQuizId = homeworkQuizId;
    }

    public int getHomeworkQuizItemId() {
        return homeworkQuizItemId;
    }

    public void setHomeworkQuizItemId(int homeworkQuizItemId) {
        homeworkQuizItemId = homeworkQuizItemId;
    }

    public String getGithubAddress() {
        return githubAddress;
    }

    public void setGithubAddress(String githubAddress) {
        this.githubAddress = githubAddress;
    }
}
