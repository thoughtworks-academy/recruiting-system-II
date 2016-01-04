package com.thoughtworks.twars.resource;
import com.thoughtworks.twars.bean.BlankQuiz;
import com.thoughtworks.twars.bean.QuizItem;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.junit.Assert.assertThat;


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


    @Test
    public void should_return_quiz_items_by_blank_quiz_id(){
        QuizItem firstQuizItem = mock(QuizItem.class);
        QuizItem secondQuizItem = mock(QuizItem.class);

        when(quizItemMapper.findByBlankQuizId(1)).thenReturn(Arrays.asList(firstQuizItem,secondQuizItem));
        when(firstQuizItem.getId()).thenReturn(2);
        when(firstQuizItem.getQuestionZh()).thenReturn("请输出6号格子的值:");
        when(firstQuizItem.getDescriptionZh()).thenReturn("将4号盒子中的数字放在4号盒子中");
        when(firstQuizItem.getChartPath()).thenReturn("/chart.jpg");
        when(firstQuizItem.getInitializedBox()).thenReturn("2,3,5,7,4,2,4");

        Response response = target(basePath+"/1").request().get();
        assertThat(response.getStatus(),is(200));

        List<Map> quizItems = response.readEntity(List.class);

        assertThat(quizItems.get(0).get("id"),is(2));
        assertThat(quizItems.get(0).get("question"),is("请输出6号格子的值:"));
        assertThat(quizItems.get(0).get("description"),is("将4号盒子中的数字放在4号盒子中"));
        assertThat(quizItems.get(0).get("initializedBox"),is("2,3,5,7,4,2,4"));
        assertThat(quizItems.get(0).get("chartPath"),is("/chart.jpg"));
    }
}