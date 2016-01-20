package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.ScoreSheet;
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

    @Test
    public void should_return_all_score_sheets(){
        List<ScoreSheet> scoreSheetList = scoreSheetMapper.findAll();
        assertThat(scoreSheetList.size(),is(4));
    }


    @Test
    public void  should_insert_score_sheet(){
        ScoreSheet scoreSheet = new ScoreSheet();
        scoreSheet.setPaperId(1);
        scoreSheet.setExamerId(5);

        int id = scoreSheetMapper.insertScoreSheet(scoreSheet);
        assertThat(id, is(1));

        assertThat(scoreSheet.getId(), is(5));
    }

    @Test
    public void should_return_score_sheet_by_examerid_and_paperid(){
        ScoreSheet scoreSheet = new ScoreSheet();
        scoreSheet.setPaperId(2);
        scoreSheet.setExamerId(2);

        ScoreSheet returnScoreSheet = scoreSheetMapper.selectScoreSheet(scoreSheet);
        assertThat(returnScoreSheet.getId(), is(3));
        assertThat(returnScoreSheet.getPaperId(), is(2));
        assertThat(returnScoreSheet.getExamerId(), is(2));
    }

    @Test
    public void should_return_score_sheet_by_id(){
        ScoreSheet scoreSheet = scoreSheetMapper.findOne(2);

        assertThat(scoreSheet.getExamerId(), is(2));
        assertThat(scoreSheet.getPaperId(), is(1));
    }
}
