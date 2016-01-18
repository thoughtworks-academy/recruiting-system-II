package com.thoughtworks.twars.resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.thoughtworks.twars.bean.ScoreSheet;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ScoreSheetResourceTest extends TestBase {

    Gson gson = new GsonBuilder().create();

    ScoreSheet firstScoreSheet = mock(ScoreSheet.class);
    ScoreSheet secondScoreSheet = mock(ScoreSheet.class);
    String basePath = "/scoresheets";


    @Test
    public void should_return_all_score_sheets() {
        when(scoreSheetMapper.findAll()).thenReturn(Arrays.asList(firstScoreSheet, secondScoreSheet));
        when(firstScoreSheet.getId()).thenReturn(3);

        Response response = target(basePath).request().get();
        assertThat(response.getStatus(), is(200));

        List<Map> result = response.readEntity(List.class);
        assertThat(result.get(0).get("uri"), is("scoresheets/3"));
    }

    @Test
    public void should_return_404_when_not_find_score_sheets() {
        when(scoreSheetMapper.findAll()).thenReturn(null);

        Response response = target(basePath).request().get();
        assertThat(response.getStatus(), is(404));
    }


    @Test
    public void should_insert_blank_quiz_score_sheet_uri() {

        Map itemPost = new HashMap<>();
        itemPost.put("answer", "10");
        itemPost.put("quizItemId", 3);

        List<Map> itemPosts = new ArrayList<>();
        itemPosts.add(itemPost);


        Map blankQuizSubmit = new HashMap<>();
        blankQuizSubmit.put("blankQuizId", 1);
        blankQuizSubmit.put("itemPosts", itemPosts);

        List<Map> blankQuizSubmits = new ArrayList<>();
        blankQuizSubmits.add(blankQuizSubmit);

        Map scoreSheet = new HashMap<>();
        scoreSheet.put("examerId", 1);
        scoreSheet.put("paperId", 1);
        scoreSheet.put("blankQuizSubmits", blankQuizSubmits);

        Entity<Map> entity = Entity.entity(scoreSheet, MediaType.APPLICATION_JSON_TYPE);

        Response response = target(basePath).request().post(entity);
        assertThat(response.getStatus(), is(201));
    }


    @Test
    public void should_insert_homework_quiz_score_sheet_uri() {

        int examerId = 2;
        int paperId = 1;

        String homeworkURL = "github.com/jjweng/1";
        int homeworkQuizItemId = 1;

        Map homeworkSubmitPostHistory = new HashMap<>();
        homeworkSubmitPostHistory.put("homeworkURL", homeworkURL);
        homeworkSubmitPostHistory.put("homeworkQuizItemId", homeworkQuizItemId);

        Map homeworkScoreSheet = new HashMap<>();
        homeworkScoreSheet.put("examerId", examerId);
        homeworkScoreSheet.put("paperId", paperId);
        homeworkScoreSheet.put("homeworkSubmitPostHistory", homeworkSubmitPostHistory);

        Entity<Map> entity = Entity.entity(homeworkScoreSheet, MediaType.APPLICATION_JSON_TYPE);

        Response response = target(basePath).request().post(entity);
        assertThat(response.getStatus(), is(201));
    }


    @Test
    public void shoule_return_one_score_sheet_by_id() {
        when(scoreSheetMapper.findOne(1)).thenReturn(firstScoreSheet);
        when(firstScoreSheet.getId()).thenReturn(1);
        when(firstScoreSheet.getExamerId()).thenReturn(2);
        when(firstScoreSheet.getBlankQuizId()).thenReturn(3);
        when(firstScoreSheet.getQuizItemId()).thenReturn(4);
        when(firstScoreSheet.getPaperId()).thenReturn(5);
        when(firstScoreSheet.getUserAnswer()).thenReturn("12345");

        Response response = target(basePath + "/1").request().get();
        assertThat(response.getStatus(), is(200));

        Map map = response.readEntity(Map.class);
        String str = gson.toJson(map.get("blankQuizSubmits"));
        assertThat(map.get("examer"), is(2));
        assertThat(map.get("paper"), is(5));
        assertThat(str, is("[{\"blankQuiz\":\"blankQuizzes/3\",\"itemPosts\":[{\"answer\":\"12345\",\"quizItem\":\"quizItems/4\"}]}]"));
    }

    @Test
    public void should_return_404_when_not_find_score_sheet_by_id() {
        when(scoreSheetMapper.findOne(1)).thenReturn(null);

        Response response = target(basePath + "/1").request().get();
        assertThat(response.getStatus(), is(404));
    }
}
