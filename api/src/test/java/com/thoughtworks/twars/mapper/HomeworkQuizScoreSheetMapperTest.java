package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.HomeworkQuizScoreSheet;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class HomeworkQuizScoreSheetMapperTest extends TestBase {

    private HomeworkQuizScoreSheetMapper homeworkQuizScoreSheetMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        homeworkQuizScoreSheetMapper = session.getMapper(HomeworkQuizScoreSheetMapper.class);
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
    }

    @Test
    public void should_return_influence_line_when_insert_homework_quiz_score_sheet(){

        HomeworkQuizScoreSheet homeworkQuizScoreSheet = new HomeworkQuizScoreSheet();
        homeworkQuizScoreSheet.setExamerId(1);
        homeworkQuizScoreSheet.setPaperId(1);
        homeworkQuizScoreSheet.setHomeworkQuizId(1);
        homeworkQuizScoreSheet.setHomeworkQuizItemId(1);
        homeworkQuizScoreSheet.setGithubAddress("github.com/purper/8");

        int result = homeworkQuizScoreSheetMapper.insertHomeworkQuizScoreSheet(homeworkQuizScoreSheet);

        assertThat(result, is(1));
    }
}
