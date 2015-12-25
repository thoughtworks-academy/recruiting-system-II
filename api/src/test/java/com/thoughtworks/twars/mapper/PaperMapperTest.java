package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.Paper;
import com.thoughtworks.twars.util.DBUtil;
import junit.framework.TestCase;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class PaperMapperTest extends TestCase {

    private SqlSessionFactory sqlSessionFactory;
    private PaperMapper paperMapper;
    private SqlSession session;

    public void setUp() throws Exception {
        session = DBUtil.getSession();
        paperMapper = session.getMapper(PaperMapper.class);
    }

    public void tearDown() throws Exception {

    }

    public void testFindAll() throws Exception {
        List<Paper> papers = paperMapper.findAll();
        assertThat(papers.size(), is(2));
    }
}