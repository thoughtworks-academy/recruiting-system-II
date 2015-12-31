package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.BlankQuiz;
import com.thoughtworks.twars.mapper.BlankQuizMapper;

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


@Path("/blankQuizzes")
public class BlankQuizResource {
  @Inject
  private BlankQuizMapper blankQuizMapper;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllBlankQuizzes() {

    List<BlankQuiz> blankQuizs = blankQuizMapper.findAll();
    List<Map> result = new ArrayList<>();

    for (int i = 0; i < blankQuizs.size(); i++) {
      BlankQuiz item = blankQuizs.get(i);
      Map<String,String> map = new HashMap<>();
      map.put("uri","blankQuizzes/" + item.getId());
      result.add(map);
    }

    return Response.status(200).entity(result).build();
  }
}
