package com.thoughtworks.twars.mapper;

import org.junit.After;
import org.junit.Before;

public class HomeworkQuizItemMapperTest extends TestBase {
    private HomeworkQuizItemMapper homeworkQuizItemMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        homeworkQuizItemMapper = session.getMapper(HomeworkQuizItemMapper.class);
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
    }

//    @Test
//    public void should_return_all_homework_quiz_items() throws Exception {
//        List<HomeworkQuizItem> homeworkQuizItems = homeworkQuizItemMapper.findByHomeworkQuizId(1);
//        assertThat(homeworkQuizItems.size(), is(2));
//    }

}