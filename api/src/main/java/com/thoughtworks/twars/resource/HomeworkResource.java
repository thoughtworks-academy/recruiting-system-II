package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.HomeworkQuizItem;
import com.thoughtworks.twars.mapper.HomeWorkQuizMapper;
import com.thoughtworks.twars.mapper.HomeworkQuizItemMapper;

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

@Path("/homeworkQuizzes")
public class HomeworkResource {
    @Inject
    private HomeworkQuizItemMapper homeworkQuizItemMapper;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{param}/items")
    public Response getHomeworkQuizzes(@PathParam("param") int homeworkQuizId) {

        List<HomeworkQuizItem> homeworkQuizItemList = homeworkQuizItemMapper
                .findByHomeworkQuizId(homeworkQuizId);

        if (homeworkQuizItemList == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Map<String, List> result = new HashMap<>();
        result.put("homeworkQuizItems", homeworkQuizItemList);

        return Response.status(Response.Status.OK).entity(result).build();
    }
}
