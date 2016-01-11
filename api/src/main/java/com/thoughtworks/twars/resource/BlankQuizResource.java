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
import java.util.stream.Collectors;


@Path("/blankQuizzes")
public class BlankQuizResource {
    @Inject
    private BlankQuizMapper blankQuizMapper;

    @Inject
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

        return Response.status(Response.Status.OK).entity(result).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{param}")
    public Response getBlankQuizzesBySectionId(
            @PathParam("param") int sectionId
    ) {
        List<BlankQuiz> blankQuizzes = blankQuizMapper
                .findBySectionId(sectionId);

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

        return Response.status(Response.Status.OK).entity(result).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{param}/items")
    public Response getItems(@PathParam("param") int blankQuizId) {


        BlankQuiz blankQuiz = blankQuizMapper.findOne(blankQuizId);

        List<QuizItem> easyItems = quizItemMapper
                .getEasyItems(blankQuiz.getEasyCount());
        List<QuizItem> normalItems = quizItemMapper.getNormalItems(blankQuiz
                .getNormalCount());
        List<QuizItem> hardItems = quizItemMapper.getHardItems(blankQuiz
                .getHardCount());
        List<QuizItem> exampleItems = quizItemMapper.getExampleItems();

        List<QuizItem> quizItems = new ArrayList<>();

        quizItems.addAll(easyItems);
        quizItems.addAll(normalItems);
        quizItems.addAll(hardItems);

        List quizList = quizItems
                .stream()
                .map(BlankQuizResource::buildItemMap)
                .collect(Collectors.toList());
        List exampleList = exampleItems
                .stream()
                .map(BlankQuizResource::buildExampleMap)
                .collect(Collectors.toList());

        Map<String, List> result = new HashMap<>();
        result.put("quizItems", quizList);
        result.put("exampleItems", exampleList);

        return Response.status(Response.Status.OK).entity(result).build();
    }

    private static Map buildItemMap(QuizItem quizItem) {
        Map<String, Object> result = new HashMap<>();
        result.put("id", quizItem.getId());
        result.put("initializedBox", quizItem.getInitializedBox());
        result.put("question", quizItem.getQuestionZh());
        result.put("chartPath", quizItem.getChartPath());
        result.put("description", quizItem.getDescriptionZh());
        return result;
    }

    private static Map buildExampleMap(QuizItem quizItem) {
        Map<String, Object> result = new HashMap<>();
        result.put("id", quizItem.getId());
        result.put("initializedBox", quizItem.getInitializedBox());
        result.put("question", quizItem.getQuestionZh());
        result.put("chartPath", quizItem.getChartPath());
        result.put("description", quizItem.getDescriptionZh());
        result.put("answer", quizItem.getAnswer());
        return result;
    }

}
