package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.flywaydb.core.Flyway;
import org.junit.After;
import org.junit.Before;

import java.io.IOException;
import java.util.Properties;

public class TestBase {
    protected SqlSession session;

    Flyway flyway = new Flyway();

    {
        Properties pps = new Properties();

        try {
            pps.load(Resources.getResourceAsStream("config.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        flyway.setDataSource(
                pps.getProperty("dbUrl"),
                pps.getProperty("user"),
                pps.getProperty("password")
        );

        flyway.setEncoding("UTF-8");
    }


    @Before
    public void setUp() throws Exception {
        session = DBUtil.getSession();
        flyway.clean();
        flyway.migrate();
    }

    @After
    public void tearDown() throws Exception {

    }
}
