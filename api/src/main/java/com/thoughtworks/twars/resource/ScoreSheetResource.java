package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.BlankQuizSubmit;
import com.thoughtworks.twars.bean.ItemPost;
import com.thoughtworks.twars.bean.ScoreSheet;
import com.thoughtworks.twars.mapper.BlankQuizSubmitMapper;
import com.thoughtworks.twars.mapper.ItemPostMapper;
import com.thoughtworks.twars.mapper.ScoreSheetMapper;


import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
    @Inject
    private BlankQuizSubmitMapper blankQuizSubmitMapper;
    @Inject
    private ItemPostMapper itemPostMapper;


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

        List<Map> blankQuizSubmits = (List) data.get("blankQuizSubmits");

        if(blankQuizSubmits != null){
            insertBlankQuizSubmit(blankQuizSubmits, scoreSheetId);
        }

        Map result = new HashMap<>();
        result.put("uri", "scoresheets/" + scoreSheetId);

        return Response.status(201).entity(result).build();
    }


    public void insertBlankQuizSubmit(List<Map> blankQuizSubmits, int scoreSheetId) {
        int blankQuizSubmitId;
        int blankQuizId;
        int quizItemId;
        String answer;

        for (int j = 0; j < blankQuizSubmits.size(); j++) {
            blankQuizId = (int) blankQuizSubmits.get(j).get("blankQuizId");

            BlankQuizSubmit blankQuizSubmitObj = new BlankQuizSubmit();
            blankQuizSubmitObj.setBlankQuizId(blankQuizId);
            blankQuizSubmitObj.setScoreSheetId(scoreSheetId);

            blankQuizSubmitId = blankQuizSubmitMapper.insertBlankQuizSubmit(blankQuizSubmitObj);

            List<Map> itemPosts = (List) blankQuizSubmits.get(j)
                    .get("itemPosts");
            for (int i = 0; i < itemPosts.size(); i++) {
                Map itemPost = itemPosts.get(i);
                answer = (String) itemPost.get("answer");
                quizItemId = (Integer) itemPost.get("quizItemId");

                ItemPost itemPostObj = new ItemPost();
                itemPostObj.setAnswer(answer);
                itemPostObj.setQuizItemId(quizItemId);
                itemPostObj.setBlankQuizSubmitsId(blankQuizSubmitId);

                itemPostMapper.insertItemPost(itemPostObj);
            }
        }
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
        List<Map> blankQuizSubmits = blankQuizSubmitMapper.findByScoreSheetId(id)
                .stream()
                .map(blankQuizSubmit -> {
                    Map<String, Object> blankQuizUri = new HashMap<>();
                    blankQuizUri.put("uri", "blankQuiz/" + blankQuizSubmit.getBlankQuizId());
                    Map<String, Object> blankQuizSubmitUri = new HashMap<>();
                    blankQuizSubmitUri.put("blankQuiz", blankQuizUri);
                    blankQuizSubmitUri.put("itemPosts", getItemPosts(blankQuizSubmit.getBlankQuizId()));
                    return blankQuizSubmitUri;
                })
                .collect(Collectors.toList());

        Map map = new HashMap<>();
        map.put("examer", examerUri);
        map.put("paper", paperUri);
        map.put("blankQuizSubmits", blankQuizSubmits);
        return Response.status(Response.Status.OK).entity(map).build();
    }

    public List<Map> getItemPosts(int blankQuizSubmitId) {
        return itemPostMapper.findByBlankQuizSubmit(blankQuizSubmitId)
                .stream()
                .map(itemPost -> {
                    Map<String, Object> quizItemUri = new HashMap<>();
                    quizItemUri.put("uri", "/quizItem/" + itemPost.getQuizItemId());
                    Map<String, Object> itemPostContent = new HashMap<>();
                    itemPostContent.put("answer", itemPost.getAnswer());
                    itemPostContent.put("quizItem", quizItemUri);
                    return itemPostContent;
                })
                .collect(Collectors.toList());
    }


//    public Map insertHomeworkQuizScoreSheet(Map data) {
//        int examerId = (int) data.get("examerId");
//        int paperId = (int) data.get("paperId");
//        Map homeworkQuizSubmits = (Map) data.get("homeworkQuizSubmits");
//
//        int homeworkQuizId = (int) homeworkQuizSubmits
//                .get("homeworkQuizId");
//        Map homeworkSubmitPostHistory = (Map) homeworkQuizSubmits
//                .get("homeworkSubmitPostHistory");
//        String githubAddress = (String) homeworkSubmitPostHistory
//                .get("homeworkURL");
//        int homeworkQuizItemId = (int) homeworkSubmitPostHistory
//                .get("homeworkQuizItemId");
//
//        HomeworkQhuizScoreSheet homeworkQuizScoreSheet =
//                new HomeworkQuizScoreSheet();
//
//        homeworkQuizScoreSheet.setPaperId(paperId);
//        homeworkQuizScoreSheet.setExamerId(examerId);
//        homeworkQuizScoreSheet.setGithubAddress(githubAddress);
//        homeworkQuizScoreSheet.setHomeworkQuizId(homeworkQuizId);
//        homeworkQuizScoreSheet.setHomeworkQuizItemId(homeworkQuizItemId);
//
//        homeworkQuizScoreSheetMapper
//                .insertHomeworkQuizScoreSheet(homeworkQuizScoreSheet);
//
//        Map homeworkMap = new HashMap<>();
//        homeworkMap.put("uri",
//                "scoresheets/homeworkQuiz/" + homeworkQuizScoreSheet.getId());
//
//        return homeworkMap;
//    }
}
