package com.thoughtworks.twars.api;

import com.thoughtworks.twars.bean.QuizItem;
import com.thoughtworks.twars.data.QuizItemMapper;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/quizItems")
public class QuizItemResource extends Resource {

    private QuizItemMapper quizItemMapper;

    public QuizItemResource() {
        super();
        quizItemMapper = session.getMapper(QuizItemMapper.class);
    }

    @GET
    @Path("/{param}")
    @Produces(MediaType.APPLICATION_JSON)
    public QuizItem getUser(@PathParam("param") int id) {

        QuizItem quizItem = quizItemMapper.getQuizItemById(id);

        session.close();
        return quizItem;
    }
}
