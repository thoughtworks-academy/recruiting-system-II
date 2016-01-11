package com.thoughtworks.twars.bean;

public class BlankQuiz {
    private int id;
    private int sectionId;
    private String type;
    private int count;
    private int hardCount;

    public void setId(int id) {
        this.id = id;
    }

    public void setSectionId(int sectionId) {
        this.sectionId = sectionId;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void setHardCount(int hardCount) {
        this.hardCount = hardCount;
    }

    public void setNormalCount(int normalCount) {
        this.normalCount = normalCount;
    }

    public void setEasyCount(int easyCount) {
        this.easyCount = easyCount;
    }

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
