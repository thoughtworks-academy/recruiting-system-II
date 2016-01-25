package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.Paper;
import com.thoughtworks.twars.mapper.PaperMapper;
import com.thoughtworks.twars.mapper.SectionMapper;
import com.thoughtworks.twars.service.quiz.definition.BlankQuizDefinition;
import com.thoughtworks.twars.service.quiz.definition.HomeworkQuizDefinition;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Path("/papers")
public class PaperResource extends Resource {

    @Inject
    private PaperMapper paperMapper;
    @Inject
    private SectionMapper sectionMapper;
    @Inject
    private HomeworkQuizDefinition homeworkQuizDefinition;
    @Inject
    private BlankQuizDefinition blankQuizDefinition;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPapers() {

        List<Paper> papers = paperMapper.findAll();
        List<Map> result = new ArrayList<>();

        if (papers == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        for (int i = 0; i < papers.size(); i++) {
            Paper item = papers.get(i);
            Map<String, String> map = new HashMap<>();
            map.put("uri", "papers/" + item.getId());
            result.add(map);
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertPaper(Map data) {
        int makerId = (int) data.get("makerId");
        List<Map> sections = (List<Map>) data.get("sections");

        Paper paper = new Paper();
        paper.setMakerId(makerId);

        paperMapper.insertPaper(paper);
        int paperId = paper.getId();

        List<Map> result = sections.stream()
                .map(item -> {
                    Map map = new HashMap();
                    map.put("uri", insertDefinitionByQuizType(item, paperId));
                    return map;
                })
                .collect(Collectors.toList());

        return Response.status(Response.Status.OK).entity(result.get(0)).build();
    }


    public String insertDefinitionByQuizType(Map item, int paperId) {
        List<Map> quizzes = (List<Map>) item.get("quizzes");
        String description = (String) item.get("desc");
        List list = null;

        for (int i = 0; i < quizzes.size(); i++) {
            if ("blankQuizzes".equals(quizzes.get(i).get("quizType"))) {
                blankQuizDefinition.insertQuizDefinition(quizzes.get(i), description, paperId);
            } else if ("homeworkQuizzes".equals(quizzes.get(i).get("quizType"))) {
                homeworkQuizDefinition.insertQuizDefinition(quizzes.get(i), description, paperId);
            }
        }

        return "papers/"+paperId;
    }


    @GET
    @Path("/{param}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOnePaper(@PathParam("param") int id) {

        if (sectionMapper.getSectionsByPaperId(id) == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        List<Map> sectionList = sectionMapper.getSectionsByPaperId(id)
                .stream()
                .map(item -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", item.getId());
                    map.put("type", item.getType());
                    map.put("quizzes", getQuizzesBySectionId(item.getId(),
                            item.getType()));
                    return map;
                })
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("sections", sectionList);
        result.put("id", id);

        return Response.status(Response.Status.OK).entity(result).build();
    }


    @GET
    @Path("/enrollment")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEnrollmentPaper() {
        return getOnePaper(1);
    }


    private List<Map> getQuizzesBySectionId(int sectionId, String type) {

        if ("blankQuizzes".equals(type)) {
            return blankQuizDefinition.getQuizDefinition(sectionId);
        } else if ("homeworkQuizzes".equals(type)) {
            return homeworkQuizDefinition.getQuizDefinition(sectionId);
        }
        return null;
    }
}


