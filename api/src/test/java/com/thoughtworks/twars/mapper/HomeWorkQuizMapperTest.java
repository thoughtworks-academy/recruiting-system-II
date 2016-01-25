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
    public void should_return_homework_list_when_by_section_id() {
        List<HomeworkQuiz> homeworkQuizList = homeworkQuizMapper.findBySectionId(2);

        assertThat(homeworkQuizList.size(), is(5));
    }

    @Test
    public void should_return_one_homework_quiz_when_by_id() {
        HomeworkQuiz homeworkQuiz = homeworkQuizMapper.findById(1);

        assertThat(homeworkQuiz.getDescription(), is("这是一道比较简单的题目"));
        assertThat(homeworkQuiz.getEvaluateRepository(), is("evaluateRepository"));
        assertThat(homeworkQuiz.getEvaluateScript(), is("www.baidu.com"));
        assertThat(homeworkQuiz.getTemplateRepository(), is("templateRepository"));
        assertThat(homeworkQuiz.getSectionId(), is(2));
    }

    @Test
    public void should_update_homework_quiz() {
        homeworkQuizMapper.updateHomeworkQuiz(1, 3);

        assertThat(homeworkQuizMapper.findById(1).getSectionId(), is(3));
    }
}