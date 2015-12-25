package com.thoughtworks.twars.api;

import com.thoughtworks.twars.bean.Paper;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Arrays;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

public class PaperResourceTest extends TestBase {

  private String basePath = "/papers";
  Paper firstPaper = new Paper();
  Paper secondPaper = new Paper();


  @Test
  public void testGetAllPapers() throws Exception {

    when(paperMapper.findPapers()).thenReturn(Arrays.asList(firstPaper, secondPaper));

    Response response = target(basePath).request().get();

    assertThat(response.getStatus(), is(200));
  }
}
