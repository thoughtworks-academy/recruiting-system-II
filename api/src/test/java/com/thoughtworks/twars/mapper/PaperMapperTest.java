package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.Paper;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class PaperMapperTest {

    private PaperMapper paperMapper;

    @Before
    public void setUp() throws Exception {
        SqlSession session = DBUtil.getSession();
        paperMapper = session.getMapper(PaperMapper.class);
    }

    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void should_return_all_papers() throws Exception {
        List<Paper> papers = paperMapper.findAll();
        assertThat(papers.size(), is(4));
        assertThat(papers.get(0).getMakerId(), is(1));
    }
}