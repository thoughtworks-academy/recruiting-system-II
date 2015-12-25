package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.Paper;
import com.thoughtworks.twars.data.PaperMapper;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Path("/papers")
public class PaperResource {
  @Inject
  private PaperMapper paperMapper;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllPapers() {

    List<Paper> papers = paperMapper.findPapers();
    List<Map> result = new ArrayList<>();

    for(int i=0; i<papers.size(); i++) {
      Paper item = papers.get(i);
      Map<String, String> map = new HashMap<>();
      map.put("uri", "papers/" + item.getId());
      result.add(map);
    }

    return Response.status(200).entity(result).build();
  }
}
