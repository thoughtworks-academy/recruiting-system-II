package com.thoughtworks.twars.resource;
import com.thoughtworks.twars.bean.BlankQuiz;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


public class BlankQuizResourceTest extends TestBase{

    String basePath = "blankQuizzes";
    BlankQuiz firstBlankQuiz = mock(BlankQuiz.class);
    BlankQuiz secondBlankQuiz = mock(BlankQuiz.class);


    @Test
    public void should_return_all_blank_quizzes(){
        when(blankQuizMapper.findAll()).thenReturn(Arrays.asList(firstBlankQuiz,secondBlankQuiz));
        when(firstBlankQuiz.getId()).thenReturn(1);
        when(secondBlankQuiz.getId()).thenReturn(4);

        Response response = target(basePath).request().get();
        assertThat(response.getStatus(), is(200));

        List<Map> result = response.readEntity(List.class);
        assertThat((String)result.get(0).get("uri"), is("blankQuizzes/1"));
        assertThat((String)result.get(1).get("uri"), is("blankQuizzes/4"));
    }

    @Test
    public void shoud_return_blank_quizzes_by_section_id() {
        when(blankQuizMapper.findBySectionId(1)).thenReturn(Arrays.asList(firstBlankQuiz,secondBlankQuiz));
        when(firstBlankQuiz.getId()).thenReturn(2);
        when(firstBlankQuiz.getType()).thenReturn("singlePuzzle");
        when(firstBlankQuiz.getCount()).thenReturn(10);
        when(firstBlankQuiz.getEasyCount()).thenReturn(3);
        when(firstBlankQuiz.getNormalCount()).thenReturn(4);
        when(firstBlankQuiz.getHardCount()).thenReturn(3);

        Response response = target(basePath+"/1").request().get();
        assertThat(response.getStatus(), is(200));

        List<Map> blankQuizzes = response.readEntity(List.class);

        assertThat(blankQuizzes.get(0).get("id"),is(2));
        assertThat(blankQuizzes.get(0).get("type"),is("singlePuzzle"));
        assertThat(blankQuizzes.get(0).get("count"),is(10));
        assertThat(blankQuizzes.get(0).get("hardCount"),is(3));
        assertThat(blankQuizzes.get(0).get("normalCount"),is(4));
        assertThat(blankQuizzes.get(0).get("easyCount"),is(3));
    }
}