package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.QuizItem;
import com.thoughtworks.twars.mapper.BlankQuizMapper;
import com.thoughtworks.twars.mapper.QuizItemMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/quizItems")
public class QuizItemResource extends Resource {

    @Inject
    private QuizItemMapper quizItemMapper;
    private BlankQuizMapper blankQuizMapper;

    public QuizItemResource() {
        super();
        quizItemMapper = session.getMapper(QuizItemMapper.class);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllQuizItems() {
        List<QuizItem> quizItems = quizItemMapper.getAllQuizItems();
        List<Map> result = new ArrayList<>();

        if (quizItems == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        for (int i = 0; i < quizItems.size(); i++) {
            QuizItem item = quizItems.get(i);
            Map<String, String> map = new HashMap<>();
            map.put("uri", "quizItems/" + item.getId());
            result.add(map);
        }
        session.close();
        return Response.status(Response.Status.OK).entity(result).build();
    }


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertQuizItem(QuizItem quizItem) {

        quizItemMapper.insertQuizItem(quizItem);

        Map map = new HashMap();
        map.put("uri", "quizItems/" + quizItem.getId());

        return Response.status(Response.Status.CREATED).entity(map).build();
    }


    @GET
    @Path("/{param}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getQuizItem(@PathParam("param") int id) {

        QuizItem quizItem = quizItemMapper.getQuizItemById(id);

        if (quizItem == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Map map = new HashMap();
        map.put("id", quizItem.getId());
        map.put("description", quizItem.getDescriptionZh());
        map.put("chartPath", quizItem.getChartPath());
        map.put("question", quizItem.getQuestionZh());
        map.put("initializedBox", quizItem.getInitializedBox());

        session.close();

        return Response.status(Response.Status.OK).entity(map).build();
    }


}
