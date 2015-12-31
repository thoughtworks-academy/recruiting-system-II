package com.thoughtworks.twars.resource;

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
    assertThat((String)result.get(0).get("uri"), is("papers/1"));
    assertThat((String)result.get(1).get("uri"), is("papers/5"));
  }

  @Test
  public void should_return_detail_when_request_a_specified_paper() throws Exception {
    Section blankSection = mock(Section.class);

    BlankQuiz firstBlankQuiz = mock(BlankQuiz.class);
    BlankQuiz secondBlankQuiz = mock(BlankQuiz.class);

    when(paperMapper.getPaperById(1)).thenReturn(firstPaper);
    when(sectionMapper.getSectionsByPaperId(1)).thenReturn(Arrays.asList(blankSection));

    when(blankSection.getId()).thenReturn(23);
    when(blankSection.getDescription()).thenReturn("逻辑题");

    when(blankQuizMapper.findBySectionId(23)).thenReturn(Arrays.asList(firstBlankQuiz, secondBlankQuiz));

    Response response = target(basePath + "/1").request().get();
    assertThat(response.getStatus(), is(200));

    Map result = response.readEntity(Map.class);
    List<Map> sections = (List<Map>) result.get("sections");

    assertThat(sections.size(), is(1));
    assertThat(sections.get(0).get("id"), is(23));
    assertThat(sections.get(0).get("desc"), is("逻辑题"));

    List<Map> quizzes = (List<Map>) sections.get(0).get("quizzes");
    assertThat(quizzes.size(), is(2));
//    assertThat(quizzes.get(0).get("uri"), is("/blankQuizzes/7"));
//    assertThat(quizzes.get(1).get("uri"), is("/blankQuizzes/9"));
  }
}
