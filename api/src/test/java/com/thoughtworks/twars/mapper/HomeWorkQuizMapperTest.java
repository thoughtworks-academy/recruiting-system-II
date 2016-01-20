package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.HomeworkQuiz;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class HomeWorkQuizMapperTest extends TestBase {
    private HomeWorkQuizMapper homeWorkQuizMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        homeWorkQuizMapper = session.getMapper(HomeWorkQuizMapper.class);
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
    }

//    @Test
//    public void should_return_some_home_work_quizzes_by_given_section_id() throws Exception {
//        List<HomeworkQuiz> homeworkQuizzes = homeWorkQuizMapper.findBySectionId(1);
//        assertThat(homeworkQuizzes.size(), is(0));
//    }
}