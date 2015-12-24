package com.thoughtworks.twars;

import org.glassfish.jersey.server.ResourceConfig;

//@ApplicationPath("resources")
public class App extends ResourceConfig {
    public App() {
        packages("com.thoughtworks.twars.action");
    }
}
