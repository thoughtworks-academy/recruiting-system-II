package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.tasks.DBRecovery;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;

public class TestBase {
    protected SqlSession session;

    @Before
    public void setUp() throws Exception {
        session = DBUtil.getSession();
    }

    @After
    public void tearDown() throws Exception {
        String[] args = new String[]{"1"};
        DBRecovery.main(args);
    }
}
