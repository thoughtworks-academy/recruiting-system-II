package com.thoughtworks.twars.bean;

public class ScoreSheet {
    private int id;
    private int examerId;
    private int blankQuizId;
    private int quizItemId;
    private int paperId;
    private String userAnswer;

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

    public int getExamerId() {
        return examerId;
    }

    public void setExamerId(int examerId) {
        this.examerId = examerId;
    }

    public int getBlankQuizId() {
        return blankQuizId;
    }

    public void setBlankQuizId(int blankQuizId) {
        this.blankQuizId = blankQuizId;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public int getQuizItemId() {
        return quizItemId;
    }

    public void setQuizItemId(int quizItemId) {
        this.quizItemId = quizItemId;
    }
}
