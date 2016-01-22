package com.thoughtworks.twars.bean;

public class HomeworkPostHistory {
    private int id;
    private int status;
    private int timestamp;
    private String homeworkURL;
    private int homeworkSubmitId;
    private String version;
    private String branch;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHomeworkURL() {
        return homeworkURL;
    }

    public void setHomeworkURL(String homeworkURL) {
        this.homeworkURL = homeworkURL;
    }

    public int getHomeworkSubmitId() {
        return homeworkSubmitId;
    }

    public void setHomeworkSubmitId(int homeworkSubmitId) {
        this.homeworkSubmitId = homeworkSubmitId;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
    }
}
