package com.thoughtworks.twars.resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.thoughtworks.twars.bean.BlankQuiz;
import com.thoughtworks.twars.bean.HomeworkQuiz;
import com.thoughtworks.twars.bean.Paper;
import com.thoughtworks.twars.bean.Section;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class PaperResourceTest extends TestBase {

    String basePath = "/papers";

    @Mock
    Section firstSection;

    @Mock
    Section secondSection;

    @Mock
    Paper firstPaper;

    @Mock
    Paper secondPaper;

    @Mock
    BlankQuiz firstBlankQuiz;

    @Mock
    HomeworkQuiz firstHomeworkQuiz;



    @Test
    public void should_list_all_papers() throws Exception {

        when(paperMapper.findAll()).thenReturn(Arrays.asList(firstPaper, secondPaper));
        when(firstPaper.getId()).thenReturn(1);
        when(secondPaper.getId()).thenReturn(5);


        Response response = target(basePath).request().get();
        assertThat(response.getStatus(), is(200));

        List<Map> result = response.readEntity(List.class);
        assertThat((String) result.get(0).get("uri"), is("papers/1"));
        assertThat((String) result.get(1).get("uri"), is("papers/5"));
    }

    @Test
    public void should_return_404_when_response_all_papers() throws Exception {

        when(paperMapper.findAll()).thenReturn(null);

        Response response = target(basePath).request().get();
        assertThat(response.getStatus(), is(404));
    }


    @Test
    public void should_return_detail_when_request_a_specified_paper() throws Exception {
        Gson gson = new GsonBuilder().create();

        Map<String, Object> homework1 = new HashMap<>();
        homework1.put("id", 1);
        homework1.put("definition-uri", "homeworkQuizzes/1");

        Map<String, Object> homework2 = new HashMap<>();
        homework2.put("id", 2);
        homework2.put("definition-uri", "homeworkQuizzes/2");


        Map<String, Object> blankQuiz = new HashMap<>();
        blankQuiz.put("id", 1);
        blankQuiz.put("definition-uri", "blankQuizzes/1");
        blankQuiz.put("items-uri", "blankQuizzes/1/items");

        when(homeworkQuizDefinition.getQuizDefinition(99)).thenReturn(Arrays.asList(homework1, homework2));
        when(blankQuizDefinition.getQuizDefinition(100)).thenReturn(Arrays.asList(blankQuiz));

        when(sectionMapper.getSectionsByPaperId(1)).thenReturn(Arrays.asList(firstSection, secondSection));

        when(firstSection.getId()).thenReturn(99);
        when(firstSection.getType()).thenReturn("homeworkQuizzes");

        when(secondSection.getId()).thenReturn(100);
        when(secondSection.getType()).thenReturn("blankQuizzes");

        Response response = target(basePath + "/1").request().get();
        assertThat(response.getStatus(), is(200));

        Map result = response.readEntity(Map.class);
        String jsonStr = gson.toJson(result);

        assertThat(jsonStr, is("{\"id\":1,\"sections\":[{\"id\":99,\"quizzes\":[{\"id\":1,\"definition-uri\":\"homeworkQuizzes/1\"},{\"id\":2,\"definition-uri\":\"homeworkQuizzes/2\"}],\"type\":\"homeworkQuizzes\"},{\"id\":100,\"quizzes\":[{\"items-uri\":\"blankQuizzes/1/items\",\"id\":1,\"definition-uri\":\"blankQuizzes/1\"}],\"type\":\"blankQuizzes\"}]}"));
    }

    @Test
    public void should_return_404_when_request_one_paper() throws Exception {

        when(sectionMapper.getSectionsByPaperId(9)).thenReturn(null);

        Response response = target(basePath+"/9").request().get();
        assertThat(response.getStatus(), is(404));
    }


    @Test
    public void should_return_uri_when_request_enrollment() throws Exception {

        Gson gson = new GsonBuilder().create();

        Map<String, Object> homework1 = new HashMap<>();
        homework1.put("id", 1);
        homework1.put("definition-uri", "homeworkQuizzes/1");

        Map<String, Object> homework2 = new HashMap<>();
        homework2.put("id", 2);
        homework2.put("definition-uri", "homeworkQuizzes/2");


        Map<String, Object> blankQuiz = new HashMap<>();
        blankQuiz.put("id", 1);
        blankQuiz.put("definition-uri", "blankQuizzes/1");
        blankQuiz.put("items-uri", "blankQuizzes/1/items");

        when(homeworkQuizDefinition.getQuizDefinition(99)).thenReturn(Arrays.asList(homework1, homework2));
        when(blankQuizDefinition.getQuizDefinition(100)).thenReturn(Arrays.asList(blankQuiz));

        when(sectionMapper.getSectionsByPaperId(1)).thenReturn(Arrays.asList(firstSection, secondSection));

        when(secondSection.getId()).thenReturn(100);
        when(secondSection.getType()).thenReturn("blankQuizzes");

        when(firstSection.getId()).thenReturn(99);
        when(firstSection.getType()).thenReturn("homeworkQuizzes");

        Response response = target(basePath + "/1").request().get();

        assertThat(response.getStatus(), is(200));
        Map result = response.readEntity(Map.class);
        String jsonStr = gson.toJson(result);

        assertThat(jsonStr, is("{\"id\":1,\"sections\":[{\"id\":99,\"quizzes\":[{\"id\":1,\"definition-uri\":\"homeworkQuizzes/1\"},{\"id\":2,\"definition-uri\":\"homeworkQuizzes/2\"}],\"type\":\"homeworkQuizzes\"},{\"id\":100,\"quizzes\":[{\"items-uri\":\"blankQuizzes/1/items\",\"id\":1,\"definition-uri\":\"blankQuizzes/1\"}],\"type\":\"blankQuizzes\"}]}"));

    }
}
