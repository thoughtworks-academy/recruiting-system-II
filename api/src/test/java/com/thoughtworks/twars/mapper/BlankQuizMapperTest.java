package com.thoughtworks.twars.mapper;


import com.thoughtworks.twars.bean.BlankQuiz;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class BlankQuizMapperTest extends TestBase {

    private BlankQuizMapper blankQuizMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        blankQuizMapper = session.getMapper(BlankQuizMapper.class);
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
    }

    @Test
    public void should_return_all_blankQuizzes() throws Exception {
        List<BlankQuiz> blankQuizzes = blankQuizMapper.findAll();
        assertThat(blankQuizzes.size(), is(6));
    }

    @Test
    public void should_return_some_blank_quizzes_by_given_section_id() throws Exception {
        List<BlankQuiz> blankQuizzes = blankQuizMapper.findBySectionId(1);
        assertThat(blankQuizzes.size(), is(3));
    }

    @Test
    public void should_return_count_object_by_given_id() throws Exception {
        BlankQuiz blankQuiz = blankQuizMapper.findOne(1);
        assertThat(blankQuiz.getCount(), is(10));
        assertThat(blankQuiz.getNormalCount(), is(4));
        assertThat(blankQuiz.getHardCount(), is(3));
        assertThat(blankQuiz.getEasyCount(), is(3));
    }
}
