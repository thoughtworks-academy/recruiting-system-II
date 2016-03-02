package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.PasswordRetrieveDetail;
import com.thoughtworks.twars.bean.User;
import com.thoughtworks.twars.bean.UserDetail;
import com.thoughtworks.twars.mapper.PasswordRetrieveDetailMapper;
import com.thoughtworks.twars.mapper.UserMapper;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@Path("/users")
public class UserResource extends Resource {

    @Inject
    private UserMapper userMapper;

    @Inject
    private PasswordRetrieveDetailMapper passwordRetrieveDetailMapper;

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
        map.put("birthday", detail.getBirthday());

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

        Map<String, String> map = new HashMap<>();

        if (null != user) {

            map.put("uri", "users/" + user.getId());

            return Response.status(Response.Status.OK).entity(map).build();
        }

        map.put("uri", null);

        return Response.status(Response.Status.OK).entity(map).build();
    }

    @PUT
    @Path("/{param}/password")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUserPassword(
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

    @GET
    @Path("/password/retrieve")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findUserByField(
            @QueryParam("field") String field,
            @QueryParam("value") String value
    ) {
        User user = userMapper.getUserByEmail(value);
        Map<String, String> map = new HashMap<>();
        String token = null;

        if (null == user) {
            map.put("status", "404");
            map.put("token", token);

            return Response.status(Response.Status.OK).entity(map).build();
        }

        PasswordRetrieveDetail passwordRetrieveDetail =
                passwordRetrieveDetailMapper.getDetailByEmail(value);

        if (passwordRetrieveDetail != null) {
            token = passwordRetrieveDetail.getToken();
            map.put("status", "200");
            map.put("token", token);

            return Response.status(Response.Status.OK).entity(map).build();
        } else {
            passwordRetrieveDetailMapper.updateDetailByEmail(value);
            token = passwordRetrieveDetailMapper.getDetailByEmail(value).getToken();
            map.put("status", "200");
            map.put("token", token);

            return Response.status(Response.Status.OK).entity(map).build();
        }
    }


    @POST
    @Path("/password/reset")
    @Produces(MediaType.APPLICATION_JSON)
    public Response resetPassword(Map data) {
        String newPasword = (String) data.get("newPassword");
        String token = (String) data.get("token");
        int timeLimit = 86400;

        Map map = new HashMap<>();

        PasswordRetrieveDetail passwordRetrieveDetail =
                passwordRetrieveDetailMapper.getDetailByToken(token);

        if (passwordRetrieveDetail == null) {
            map.put("status", "403");
            return Response.status(Response.Status.OK).entity(map).build();
        }

        long timeInterval = Calendar.getInstance().getTimeInMillis()/1000 - passwordRetrieveDetail.getRetrieveDate();

        System.out.println(passwordRetrieveDetail.getToken());
        System.out.println(timeInterval);

        if (timeLimit > timeInterval) {
            User user = new User();
            user.setEmail(passwordRetrieveDetail.getEmail());
            user.setPassword(newPasword);

            userMapper.resetPassword(user);
            map.put("status", "201");
        }else{
            map.put("status", "412");
        }

        return Response.status(Response.Status.OK).entity(map).build();
    }


}
