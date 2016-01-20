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
    public void should_return_uri_when_insert_user_answer(){

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

        Map data = new HashMap<>();
        data.put("examerId", 2);
        data.put("paperId", 2);
        data.put("blankQuizSubmits", blankQuizSubmits);

        Entity<Map> entity = Entity.entity(data, MediaType.APPLICATION_JSON_TYPE);

        Response response = target(basePath).request().post(entity);
        assertThat(response.getStatus(), is(201));
    }

//    @Test
//    public void should_insert_homework_quiz_score_sheet_uri() {
//
//        int examerId = 2;
//        int paperId = 1;
//
//        String homeworkURL = "github.com/jjweng/1";
//        int homeworkQuizItemId = 1;
//
//        Map homeworkSubmitPostHistory = new HashMap<>();
//        homeworkSubmitPostHistory.put("homeworkURL", homeworkURL);
//        homeworkSubmitPostHistory.put("homeworkQuizItemId", homeworkQuizItemId);
//
//        Map homeworkScoreSheet = new HashMap<>();
//        homeworkScoreSheet.put("examerId", examerId);
//        homeworkScoreSheet.put("paperId", paperId);
//        homeworkScoreSheet.put("homeworkSubmitPostHistory", homeworkSubmitPostHistory);
//
//        Entity<Map> entity = Entity.entity(homeworkScoreSheet, MediaType.APPLICATION_JSON_TYPE);
//
//        Response response = target(basePath).request().post(entity);
//        assertThat(response.getStatus(), is(201));
//    }
//
}
