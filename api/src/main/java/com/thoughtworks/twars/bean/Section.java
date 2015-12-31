package com.thoughtworks.twars.bean;

public class Section {
    private int id;
    private int paperId;

    public int getPaperId() {
        return paperId;
    }

    public void setPaperId(int paperId) {
        this.paperId = paperId;
    }

    private String description;

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
}
