package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.ScoreSheet;
import com.thoughtworks.twars.resource.TestBase;
import com.thoughtworks.twars.tasks.DBRecovery;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class ScoreSheetMapperTest extends com.thoughtworks.twars.mapper.TestBase{

    private ScoreSheetMapper scoreSheetMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        scoreSheetMapper = session.getMapper(ScoreSheetMapper.class);
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
        DBRecovery.main(new String[]{});
    }

    @Test
    public void should_return_all_score_sheets(){
        List<ScoreSheet> scoreSheetList = scoreSheetMapper.findAll();
        assertThat(scoreSheetList.size(),is(3));
    }

    @Test
    public void  should_return_insert_score_sheet_id(){
        ScoreSheet scoreSheet = new ScoreSheet();
        scoreSheet.setBlankQuizId(1);
        scoreSheet.setExamerId(5);
        scoreSheet.setQuizItemId(6);
        scoreSheet.setUserAnswer("44");

        int id = scoreSheetMapper.insertScoreSheet(scoreSheet);
        assertThat(id, is(1));

        List<ScoreSheet> list = scoreSheetMapper.findAll();
        assertThat(list.size(),is(4));
    }
}
