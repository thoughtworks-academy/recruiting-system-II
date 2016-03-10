package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.GithubUser;
import com.thoughtworks.twars.bean.LoginDetail;
import com.thoughtworks.twars.bean.User;
import com.thoughtworks.twars.mapper.GithubUserMapper;
import com.thoughtworks.twars.mapper.LoginDetailMapper;
import com.thoughtworks.twars.mapper.UserMapper;
import io.swagger.annotations.*;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Path("/login")
@Api
public class LoginResource extends Resource {

    @Inject
    private UserMapper userMapper;

    @Inject
    private LoginDetailMapper loginDetailMapper;

    @Inject
    private GithubUserMapper githubUserMapper;

    @POST
    @ApiResponses(value = {@ApiResponse(code = 201, message = "successful",
            responseHeaders = @ResponseHeader(name = "token", description = "login token",
                    response = String.class)),
            @ApiResponse(code = 401, message = "login failed")})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(
            @ApiParam(name = "user",value = "User example", required = true)
            User user) {

        Pattern mobilePhoneMatches = Pattern
                .compile("^1([3|4|5|8])[0-9]\\d{8}$");
        Matcher mobilePhoneMatcher = mobilePhoneMatches.matcher(user.getEmail());
        String emailMatches = "^[a-z0-9\\u007F-\\uffff!#$%&'*+\\/=?^_`{|}~-]"
                + "+(?:\\.[a-z0-9\\u007F-\\uffff!#$%&'*+\\/=?^_`{|}~-]+)"
                + "*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z]{2,}";

        User resultUser = new User();

        if (mobilePhoneMatcher.matches()) {
            resultUser = userMapper.getUserByMobilePhoneAndPassWord(user);
        } else if (user.getEmail().matches(emailMatches)) {

            resultUser = userMapper.getUserByEmailAndPassWord(user);
        }

        if ((resultUser == null) || (resultUser.getId() == 0)) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        List<LoginDetail> loginDetails = loginDetailMapper
                .getLoginDetailByUserId(resultUser.getId());


        if (loginDetails.size() != 0 && loginDetails.get(loginDetails.size() - 1).getFlag() == 1) {
            loginDetailMapper.updateLoginDetail(loginDetails
                    .get(loginDetails.size() - 1).getToken());
        }

        loginDetailMapper.insertLoginDetail(resultUser.getId());

        Map<String, Object> map = new HashMap<>();
        Map<String, String> userInfo = new HashMap<>();

        map.put("id", resultUser.getId());
        userInfo.put("uri", "users/" + resultUser.getId());
        map.put("userInfo", userInfo);
        
        List<LoginDetail> loginDetailList = loginDetailMapper
                .getLoginDetailByUserId(resultUser.getId());
        String token = loginDetailList.get(loginDetailList.size() - 1).getToken();

        return Response.ok(map).header("token", token).build();
    }

    @POST
    @Path("/github")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUserWithGithub(Map map) {
        User user = new User();
        GithubUser githubUser = new GithubUser();

        user.setMobilePhone((String) map.get("mobilePhone"));
        user.setEmail((String) map.get("email"));
        user.setPassword((String) map.get("password"));
        userMapper.insertUser(user);

        githubUser.setUserId(user.getId());
        githubUser.setGithubId((Integer) map.get("githubId"));
        githubUserMapper.insertGithubUser(githubUser);
        Map result = new HashMap<>();
        result.put("userId", user.getId());
        result.put("githubUserId", githubUser.getId());
        return Response.status(Response.Status.CREATED).entity(result).build();
    }

}
