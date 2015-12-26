package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.Paper;
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

  Paper firstPaper = mock(Paper.class);
  Paper secondPaper = mock(Paper.class);

  @Test
  public void should_list_all_papers() throws Exception {

    when(paperMapper.findAll()).thenReturn(Arrays.asList(firstPaper, secondPaper));
    when(firstPaper.getId()).thenReturn(1);
    when(secondPaper.getId()).thenReturn(5);


    String basePath = "/papers";
    Response response = target(basePath).request().get();
    assertThat(response.getStatus(), is(200));

    List<Map> result = response.readEntity(List.class);
    assertThat((String)result.get(0).get("uri"), is("papers/1"));
    assertThat((String)result.get(1).get("uri"), is("papers/5"));
  }
}
