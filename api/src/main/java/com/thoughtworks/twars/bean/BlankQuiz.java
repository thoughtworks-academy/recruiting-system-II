package com.thoughtworks.twars.bean;

public class BlankQuiz {
    private int id;
    private int sectionId;
    private String type;
    private int count;
    private int hardCount;
    private int normalCount;
    private int easyCount;

    public int getId() {
        return id;
    }

    public int getSectionId() {
        return sectionId;
    }

    public String getType() {
        return type;
    }

    public int getCount() {
        return count;
    }

    public int getHardCount() {
        return hardCount;
    }

    public int getNormalCount() {
        return normalCount;
    }

    public int getEasyCount() {
        return easyCount;
    }
}
