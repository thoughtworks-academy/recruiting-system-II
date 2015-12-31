package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;

public class TestBase {
    protected SqlSession session;

    @Before
    public void setUp() throws Exception {
        session = DBUtil.getSession();
        session.getConnection().setAutoCommit(false);
    }

    @After
    public void tearDown() throws Exception {
        session.rollback();
        session.close();
    }
}
