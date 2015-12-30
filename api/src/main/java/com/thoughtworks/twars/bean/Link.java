package com.thoughtworks.twars.bean;

public class Link {
    private int id;
    private String name;
    private String href;

    public Link(String href) {
        this.href = href;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() { return id; }

    public String getName() {
        return name;
    }

    public String getHref() {
        return href;
    }
}
