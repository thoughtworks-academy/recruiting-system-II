package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.ScoreSheet;
import com.thoughtworks.twars.mapper.ScoreSheetMapper;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ScoreSheetResourceTest extends TestBase{

    ScoreSheet firstScoreSheet = mock(ScoreSheet.class);
    ScoreSheet secondScoreSheet = mock(ScoreSheet.class);
    String basePath = "/scoresheets";


    @Test
    public void should_return_all_score_sheets(){
        when(scoreSheetMapper.findAll()).thenReturn(Arrays.asList(firstScoreSheet,secondScoreSheet));
        when(firstScoreSheet.getId()).thenReturn(3);

        Response response = target(basePath).request().get();
        assertThat(response.getStatus(),is(200));

        List<Map> result = response.readEntity(List.class);
        assertThat(result.get(0).get("uri"),is("scoresheets/3"));
    }


    @Test
    public void should_return_insert_score_sheet_uri(){

        when(scoreSheetMapper.insertScoreSheet(firstScoreSheet)).thenReturn(1);
        when(firstScoreSheet.getId()).thenReturn(5);
        when(firstScoreSheet.getBlankQuizId()).thenReturn(6);
        when(firstScoreSheet.getExamerId()).thenReturn(7);
        when(firstScoreSheet.getQuizItemId()).thenReturn(8);
        when(firstScoreSheet.getUserAnswer()).thenReturn("9");

        secondScoreSheet.setBlankQuizId(1);
        secondScoreSheet.setExamerId(5);
        secondScoreSheet.setQuizItemId(6);
        secondScoreSheet.setUserAnswer("44");

//        Response response = target(basePath).request().post(Entity.entity(secondScoreSheet, MediaType.APPLICATION_JSON_TYPE));
//        assertThat(response.getStatus(),is(201));
    }
}
