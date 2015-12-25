package com.thoughtworks.twars.api;

import com.thoughtworks.twars.bean.Paper;
import com.thoughtworks.twars.data.PaperMapper;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("/papers")
public class PaperResource {
  @Inject
  private PaperMapper paperMapper;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getUser() {

    List<Paper> papers = paperMapper.findPapers();

    return Response.status(200).entity(papers).build();
  }
}
