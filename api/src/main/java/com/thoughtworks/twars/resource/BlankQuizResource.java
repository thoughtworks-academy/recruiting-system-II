package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.BlankQuiz;
import com.thoughtworks.twars.bean.QuizItem;
import com.thoughtworks.twars.mapper.BlankQuizMapper;
import com.thoughtworks.twars.mapper.QuizItemMapper;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
    private QuizItemMapper quizItemMapper;
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllBlankQuizzes() {

        List<BlankQuiz> blankQuizzes = blankQuizMapper.findAll();
        List<Map> result = new ArrayList<>();

        for (int i = 0; i < blankQuizzes.size(); i++) {
            BlankQuiz item = blankQuizzes.get(i);
            Map<String, String> map = new HashMap<>();
            map.put("uri", "blankQuizzes/" + item.getId());
            result.add(map);
        }

        return Response.status(200).entity(result).build();
    }



    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{param}")
    public Response getBlankQuizzesBySectionId(
            @PathParam("param") int sectionId
    ) {
        List<BlankQuiz> blankQuizzes = blankQuizMapper.findBySectionId(sectionId);
        List<Map> result = new ArrayList<>();

        for (int i = 0; i < blankQuizzes.size(); i++) {
            BlankQuiz item = blankQuizzes.get(i);
            Map map = new HashMap<>();
            map.put("id", item.getId());
            map.put("type", item.getType());
            map.put("count", item.getCount());
            map.put("hardCount", item.getHardCount());
            map.put("normalCount", item.getNormalCount());
            map.put("easyCount", item.getEasyCount());
            result.add(map);
        }

        return Response.status(200).entity(result).build();
    }

}
