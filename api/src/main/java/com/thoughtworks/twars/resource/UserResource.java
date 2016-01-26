package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.User;
import com.thoughtworks.twars.bean.UserDetail;
import com.thoughtworks.twars.mapper.UserMapper;

import java.util.HashMap;
import java.util.Map;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/users")
public class UserResource extends Resource {

    @Inject
    private UserMapper userMapper;

    @GET
    @Path("/{param}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("param") int userId) {

        User user = userMapper.getUserById(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("email", user.getEmail());
        map.put("mobilePhone", user.getMobilePhone());

        return Response.status(Response.Status.OK).entity(map).build();
    }

    @GET
    @Path("/{param}/detail")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserDetail(@PathParam("param") int userId) {

        UserDetail detail = userMapper.getUserDetailById(userId);

        if (null == detail) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Map<String, Object> map = new HashMap<>();
        map.put("userId", detail.getUserId());
        map.put("school", detail.getSchool());
        map.put("major", detail.getMajor());
        map.put("degree", detail.getDegree());
        map.put("name", detail.getName());
        map.put("gender", detail.getGender());

        return Response.status(Response.Status.OK).entity(map).build();
    }

    @PUT
    @Path("/{param}/detail")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUserDetail(
            @PathParam("param") int userId,
            UserDetail userDetail
    ) {
        userMapper.updateUserDetail(userDetail);

        Map<String, Object> map = new HashMap<>();
        map.put("uri", "userDetail/" + userDetail.getUserId());

        return Response.status(Response.Status.OK).entity(map).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserByField(
            @QueryParam("field") String field,
            @QueryParam("value") String value
    ) {
        User user = null;

        if ("email".equals(field)) {
            user = userMapper.getUserByEmail(value);
        } else if ("mobilePhone".equals(field)) {
            user = userMapper.getUserByMobilePhone(value);
        }

        if (null != user) {
            Map<String, String> map = new HashMap<>();
            map.put("uri", "users/" + user.getId());

            return Response.status(Response.Status.OK).entity(map).build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @PUT
    @Path("/{param}/password")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUserDetail(
            @PathParam("param") int userId,
            Map userPasswordMap
    ) {
        String oldPassword = (String) userPasswordMap.get("oldPassword");
        String password = (String) userPasswordMap.get("password");
        int result = userMapper
                .updatePassword(userId, oldPassword, password);

        if (1 == result) {
            Map<String, Object> map = new HashMap<>();
            map.put("uri", "users/" + userId);

            return Response.status(Response.Status.OK).entity(map).build();
        }

        return Response.status(Response.Status.BAD_REQUEST).build();
    }
}
