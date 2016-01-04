package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.User;
import com.thoughtworks.twars.bean.UserDetail;
import com.thoughtworks.twars.mapper.UserMapper;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

@Path("/user")
public class UserResource extends Resource {

    @Inject
    private UserMapper userMapper;

    @GET
    @Path("/{param}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("param") int userId) {

        User user = userMapper.getUserById(userId);

        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("email", user.getEmail());
        map.put("mobilePhone", user.getMobilePhone());

        return Response.status(200).entity(map).build();
    }

    @GET
    @Path("/{param}/detail")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserDetail(@PathParam("param") int userId) {

        UserDetail detail = userMapper.getUserDetailById(userId);
        Map<String, Object> map = new HashMap<>();
        map.put("userId", detail.getUserId());
        map.put("school", detail.getSchool());
        map.put("major", detail.getMajor());
        map.put("degree", detail.getDegree());
        map.put("name", detail.getName());
        map.put("gender", detail.getGender());

        return Response.status(200).entity(map).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserByField(
            @QueryParam("field") String field,
            @QueryParam("value") String value
    ) {
        User user = null;

        if(field.equals("email")) {
            user = userMapper.getUserByEmail(value);
        } else if(field.equals("mobilePhone")) {
            user = userMapper.getUserByMobilePhone(value);
        }

        if(null != user) {
          Map<String, String> map = new HashMap<>();
          map.put("uri", "user/" + user.getId());

          return Response.status(200).entity(map).build();
        }

        return Response.status(404).build();
    }
}
