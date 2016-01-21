package com.thoughtworks.twars.resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.thoughtworks.twars.bean.BlankQuiz;
import com.thoughtworks.twars.bean.Paper;
import com.thoughtworks.twars.bean.Section;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class PaperResourceTest extends TestBase {

    Gson gson = new GsonBuilder().create();

    String basePath = "/papers";

    Paper firstPaper = mock(Paper.class);
    Paper secondPaper = mock(Paper.class);


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


//    @Test
//    public void should_return_detail_when_request_a_specified_paper() throws Exception {
//        Section blankSection = mock(Section.class);
//        Section homeworkSection = mock(Section.class);
//
//        BlankQuiz firstBlankQuiz = mock(BlankQuiz.class);
//        HomeworkQuiz firsthomeworkQuiz = mock(HomeworkQuiz.class);
//
//        when(paperMapper.getPaperById(1)).thenReturn(firstPaper);
//        when(sectionMapper.getSectionsByPaperId(1)).thenReturn(Arrays.asList(blankSection));
//        when(paperMapper.getPaperById(1)).thenReturn(firstPaper);
//        when(sectionMapper.getSectionsByPaperId(1)).thenReturn(Arrays.asList(homeworkSection));
//
//        when(blankSection.getId()).thenReturn(22);
//        when(blankSection.getDescription()).thenReturn("逻辑题");
//        when(homeworkSection.getId()).thenReturn(22);
//        when(homeworkSection.getDescription()).thenReturn("dojo题");
//
//        when(blankQuizMapper.findBySectionId(22)).thenReturn(Arrays.asList(firstBlankQuiz));
//        when(homeWorkQuizMapper.findBySectionId(22)).thenReturn(Arrays.asList(firsthomeworkQuiz));
//
//        when(firstBlankQuiz.getId()).thenReturn(3);
//        when(firstBlankQuiz.getType()).thenReturn("blankQuizzes");
//        when(firsthomeworkQuiz.getId()).thenReturn(3);
//
//        Response response = target(basePath + "/1").request().get();
//        assertThat(response.getStatus(), is(200));
//
//        Map result = response.readEntity(Map.class);
//        String jsonStr = gson.toJson(result);
//
//        assertThat(jsonStr, is("{\"id\":1,\"sections\":[{\"id\":22,\"quizzes\":[{\"definition\":{\"uri\":\"homeworkQuizzes/3\"},\"id\":3,\"items\":{\"uri\":\"homeworkQuizzes/3/items\"}}],\"desc\":\"dojo题\"}]}"));
//    }
//
//    @Test
//    public void should_return_404_when_request_one_paper() throws Exception {
//
//        when(sectionMapper.getSectionsByPaperId(9)).thenReturn(null);
//
//        Response response = target(basePath+"/9").request().get();
//        assertThat(response.getStatus(), is(404));
//    }
//
//    @Test
//    public void should_return_uri_when_request_enrollment() throws Exception {
//        Section blankSection = mock(Section.class);
//        Section homeworkSection = mock(Section.class);
//
//        BlankQuiz firstBlankQuiz = mock(BlankQuiz.class);
//        HomeworkQuiz firsthomeworkQuiz = mock(HomeworkQuiz.class);
//
//        when(paperMapper.getPaperById(1)).thenReturn(firstPaper);
//        when(sectionMapper.getSectionsByPaperId(1)).thenReturn(Arrays.asList(blankSection));
//        when(paperMapper.getPaperById(1)).thenReturn(firstPaper);
//        when(sectionMapper.getSectionsByPaperId(1)).thenReturn(Arrays.asList(homeworkSection));
//
//        when(blankSection.getId()).thenReturn(22);
//        when(blankSection.getDescription()).thenReturn("逻辑题");
//        when(homeworkSection.getId()).thenReturn(22);
//        when(homeworkSection.getDescription()).thenReturn("dojo题");
//
//        when(blankQuizMapper.findBySectionId(22)).thenReturn(Arrays.asList(firstBlankQuiz));
//        when(homeWorkQuizMapper.findBySectionId(22)).thenReturn(Arrays.asList(firsthomeworkQuiz));
//
//        when(firstBlankQuiz.getId()).thenReturn(3);
//        when(firstBlankQuiz.getType()).thenReturn("blankQuizzes");
//        when(firsthomeworkQuiz.getId()).thenReturn(3);
//
//        Response response = target(basePath + "/enrollment").request().get();
//        assertThat(response.getStatus(), is(200));
//
//        Map result = response.readEntity(Map.class);
//        String jsonStr = gson.toJson(result);
//
//        assertThat(jsonStr, is("{\"id\":1,\"sections\":[{\"id\":22,\"quizzes\":[{\"definition\":{\"uri\":\"homeworkQuizzes/3\"},\"id\":3,\"items\":{\"uri\":\"homeworkQuizzes/3/items\"}}],\"desc\":\"dojo题\"}]}"));
//
//    }
}
