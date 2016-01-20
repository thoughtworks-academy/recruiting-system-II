package com.thoughtworks.twars.bean;

public class BlankQuizSubmit {
    private int id;
    private int scoreSheetId;
    private  int blankQuizId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getScoreSheetId() {
        return scoreSheetId;
    }

    public void setScoreSheetId(int scoreSheetId) {
        this.scoreSheetId = scoreSheetId;
    }

    public int getBlankQuizId() {
        return blankQuizId;
    }

    public void setBlankQuizId(int blankQuizId) {
        this.blankQuizId = blankQuizId;
    }
}
