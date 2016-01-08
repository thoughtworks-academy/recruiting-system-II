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
        ScoreSheet scoreSheet = new ScoreSheet();

        scoreSheet.setBlankQuizId(1);
        scoreSheet.setExamerId(5);
        scoreSheet.setQuizItemId(6);
        scoreSheet.setUserAnswer("44");

        Response response = target(basePath).request().post(Entity.entity(scoreSheet, MediaType.APPLICATION_JSON_TYPE));
        assertThat(response.getStatus(),is(201));
    }
}
