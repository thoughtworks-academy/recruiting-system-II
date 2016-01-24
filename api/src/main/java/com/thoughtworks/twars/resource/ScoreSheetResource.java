package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.ScoreSheet;
import com.thoughtworks.twars.mapper.*;
import com.thoughtworks.twars.service.quiz.quizScoreSheet.BlankQuizScoreSheet;
import com.thoughtworks.twars.service.quiz.quizScoreSheet.HomeworkQuizScoreSheet;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Path("/scoresheets")
public class ScoreSheetResource extends Resource {
    @Inject
    private ScoreSheetMapper scoreSheetMapper;
    @Inject
    private BlankQuizScoreSheet blankQuizScoreSheet;
    @Inject
    private HomeworkQuizScoreSheet homeworkQuizScoreSheet;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAll() {
        List<ScoreSheet> scoreSheets = scoreSheetMapper.findAll();
        List result = new ArrayList<>();

        if (scoreSheets == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

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
        int paperId = (int) data.get("paperId");
        int scoreSheetId;

        ScoreSheet scoreSheet = new ScoreSheet();
        scoreSheet.setPaperId(paperId);
        scoreSheet.setExamerId(examerId);

        ScoreSheet selectScoreSheet = scoreSheetMapper.selectScoreSheet(scoreSheet);

        if (selectScoreSheet != null) {
            scoreSheetId = selectScoreSheet.getId();
        } else {
            scoreSheetMapper.insertScoreSheet(scoreSheet);
            scoreSheetId = scoreSheet.getId();
        }

        List<Map> blankQuizSubmits = (List<Map>) data.get("blankQuizSubmits");
        List<Map> homeworkSubmits = (List<Map>) data.get("homeworkSubmits");

        if (blankQuizSubmits != null) {
            blankQuizScoreSheet.insertQuizScoreSheet(data, scoreSheetId);
        }
        if (homeworkSubmits != null) {
            homeworkQuizScoreSheet.insertQuizScoreSheet(data, scoreSheetId);
        }
        Map result = new HashMap<>();
        result.put("uri", "scoresheets/" + scoreSheetId);

        return Response.status(201).entity(result).build();
    }


    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findOne(
            @PathParam("id") int id
    ) {
        ScoreSheet scoreSheet = scoreSheetMapper.findOne(id);
        Map<String, Object> examerUri = new HashMap<>();
        Map<String, Object> paperUri = new HashMap<>();
        examerUri.put("uri", "examer/" + scoreSheet.getExamerId());
        paperUri.put("uri", "paper/" + scoreSheet.getPaperId());

        Map map = new HashMap<>();
        map.put("examer", examerUri);
        map.put("paper", paperUri);
        map.put("blankQuizSubmit", blankQuizScoreSheet.getQuizScoreSheet(id));
        map.put("homeworkQuizSubmit", homeworkQuizScoreSheet.getQuizScoreSheet(id));

        return Response.status(Response.Status.OK).entity(map).build();
    }

}