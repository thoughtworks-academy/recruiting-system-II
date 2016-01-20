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

    //    @Test
//    public void should_return_one_score_sheet(){
//        ScoreSheet scoreSheet = scoreSheetMapper.findOne(1);
//        assertThat(scoreSheet.getId(), is(1));
//        assertThat(scoreSheet.getUserAnswer(), is("23"));
//    }
//

    ////////////////////////////////////////////////////
//    @Test
//    public void  should_return_id_when_insert_score_sheet(){
//        ScoreSheet scoreSheet = new ScoreSheet();
//        scoreSheet.setExamerId(1);
//        scoreSheet.setPaperId(1);
//
//        scoreSheetMapper.insertScoreSheet(scoreSheet);
//
//        List<ScoreSheet> list = scoreSheetMapper.findAll();
//        assertThat(list.size(), is(5));
//    }
//
//    @Test
//    public void  should_return_id_when_select_score_sheet(){
//        ScoreSheet scoreSheet = new ScoreSheet();
//        scoreSheet.setExamerId(1);
//        scoreSheet.setPaperId(1);
//
//        scoreSheetMapper.selectScoreSheet(scoreSheet);
//
//        List<ScoreSheet> list = scoreSheetMapper.findAll();
//        assertThat(list.size(), is(4));
//    }
}
