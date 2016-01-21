package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.HomeworkQuiz;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;


public class HomeWorkQuizMapperTest extends TestBase {
    private HomeworkQuizMapper homeworkQuizMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        homeworkQuizMapper = session.getMapper(HomeworkQuizMapper.class);
    }

    @Test
    public void should_return_homework_list_when_by_section_id(){
        List<HomeworkQuiz> homeworkQuizList = homeworkQuizMapper.findBySectionId(1);

        assertThat(homeworkQuizList.size(), is(5));
    }

}