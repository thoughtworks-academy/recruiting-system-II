package com.thoughtworks.twars.bean;

public class QuizItem {
    private int id;
    private String initializedBox;
    private String stepsString;
    private int count;
    private String question;
    private String questionZh;
    private int stepsLength;
    private int maxUpdateTimes;
    private int answer;
    private String description;
    private String descriptionZh;
    private String chartPath;

    public String getInfoPath() {
        return infoPath;
    }

    private String infoPath;

    public int getId() {
        return id;
    }

    public String getInitializedBox() {
        return initializedBox;
    }

    public String getStepsString() {
        return stepsString;
    }

    public int getCount() {
        return count;
    }

    public String getQuestion() {
        return question;
    }

    public String getQuestionZh() {
        return questionZh;
    }

    public int getStepsLength() {
        return stepsLength;
    }

    public int getMaxUpdateTimes() {
        return maxUpdateTimes;
    }

    public String getDescription() {
        return description;
    }

    public String getDescriptionZh() {
        return descriptionZh;
    }

    public String getChartPath() {
        return chartPath;
    }
}
