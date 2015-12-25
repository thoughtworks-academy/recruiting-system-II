package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Resource {

    protected SqlSession session;
    protected Logger logger;

    public Resource() {
        session = DBUtil.getSession();
        logger = LogManager.getRootLogger();
    }
}
