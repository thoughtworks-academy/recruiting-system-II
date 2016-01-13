package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.ScoreSheet;
import com.thoughtworks.twars.mapper.ScoreSheetMapper;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Path("/scoresheets")
public class ScoreSheetResource extends Resource {
    @Inject
    private ScoreSheetMapper scoreSheetMapper;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAll() {
        List<ScoreSheet> scoreSheets = scoreSheetMapper.findAll();
        List<Map<String, String>> result = new ArrayList<Map<String, String>>();

        for (int i = 0; i < scoreSheets.size(); i++) {
            ScoreSheet scoreSheet = scoreSheets.get(i);
            Map<String, String> map = new HashMap<>();
            map.put("uri", "scoresheets/" + scoreSheet.getId());

            result.add(map);
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response insertScoreSheet(Map data) {

        int examerId = (int) data.get("examerId");
        int blankQuizId;
        int quizItemId;
        int paperId = (int) data.get("paperId");
        String answer;
        List<Map> blankQuizSubmits = (List) data.get("blankQuizSubmits");
        for (int j = 0; j < blankQuizSubmits.size(); j++) {
            blankQuizId = (int) blankQuizSubmits.get(j).get("blankQuizId");
            List<Map> itemPosts = (List) blankQuizSubmits.get(j)
                    .get("itemPosts");
            for (int i=0; i<itemPosts.size(); i++) {
                Map itemPost = itemPosts.get(i);
                answer = (String) itemPost.get("answer");
                quizItemId = (Integer) itemPost.get("quizItemId");
                ScoreSheet sheet = new ScoreSheet();
                sheet.setUserAnswer(answer);
                sheet.setQuizItemId(quizItemId);
                sheet.setBlankQuizId(blankQuizId);
                sheet.setExamerId(examerId);
                sheet.setPaperId(paperId);

                scoreSheetMapper.insertScoreSheet(sheet);

            }
        }

        return Response.status(Response.Status.CREATED).build();
    }


    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findOne(
            @PathParam("id") int id
    ){
        ScoreSheet scoreSheet = scoreSheetMapper.findOne(id);

        List<Map> itemPosts = new ArrayList<>();
        List<Map> blankQuizSubmits = new ArrayList<>();

        Map itemPost = new HashMap<>();
        Map blankQuizItem = new HashMap<>();

        itemPost.put("answer", scoreSheet.getUserAnswer());
        itemPost.put("quizItem", "quizItems/"+scoreSheet.getQuizItemId());
        itemPosts.add(itemPost);

        blankQuizItem.put("blankQuiz",
                "blankQuizzes/"+scoreSheet.getBlankQuizId());
        blankQuizItem.put("itemPosts", itemPosts);
        blankQuizSubmits.add(blankQuizItem);

        Map map = new HashMap<>();
        map.put("examer", scoreSheet.getExamerId());
        map.put("paper", scoreSheet.getPaperId());
        map.put("blankQuizSubmits", blankQuizSubmits);
        return Response.status(Response.Status.OK).entity(map).build();
    }
}
