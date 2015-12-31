package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.Section;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class SectionMapperTest {

    SectionMapper sectionMapper;
    SqlSession session;

    @Before
    public void setUp() throws Exception {
        session = DBUtil.getSession();
        session.getConnection().setAutoCommit(false);
        sectionMapper = session.getMapper(SectionMapper.class);
    }

    @After
    public void tearDown() throws Exception {


    }

    @Test
    public void should_return_section_by_paper_id() throws Exception {

        List<Section> sections = sectionMapper.getSectionsByPaperId(1);
        assertThat(sections.size(), is(3));
    }




}