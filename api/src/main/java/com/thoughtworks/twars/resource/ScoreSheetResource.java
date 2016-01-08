package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.ScoreSheet;
import com.thoughtworks.twars.mapper.ScoreSheetMapper;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Path("/scoresheets")
public class ScoreSheetResource extends Resource {
    @Inject
    private ScoreSheetMapper scoreSheetMapper;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAll() {
        List<ScoreSheet> scoreSheets = scoreSheetMapper.findAll();
        List<Map> result = new ArrayList<>();

        for (int i = 0; i < scoreSheets.size(); i++) {
            ScoreSheet scoreSheet = scoreSheets.get(i);
            Map<String, String> map = new HashMap<>();
            map.put("uri", "scoresheets/" + scoreSheet.getId());

            result.add(map);
        }

        return Response.status(200).entity(result).build();
    }


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response insertScoreSheet(ScoreSheet scoreSheet) {

        scoreSheetMapper.insertScoreSheet(scoreSheet);

        Map map = new HashMap<>();
        map.put("uri", "/scoresheets/" + scoreSheet.getId());

        return Response.status(201).entity(map).build();
    }
}
