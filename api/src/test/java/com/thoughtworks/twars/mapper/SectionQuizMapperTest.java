package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.SectionQuiz;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class SectionQuizMapperTest extends TestBase{

    private SectionQuizMapper sectionQuizMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        sectionQuizMapper = session.getMapper(SectionQuizMapper.class);
    }

    @Test
    public void should_return_one_section_quiz_when_find_by_section_id(){
        List<SectionQuiz> sectionQuizs = sectionQuizMapper.findBySectionId(1);

        assertThat(sectionQuizs.size(), is(2));
    }
}
