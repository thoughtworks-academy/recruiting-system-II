package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.LoginDetail;
import com.thoughtworks.twars.bean.User;
import com.thoughtworks.twars.mapper.LoginDetailMapper;
import com.thoughtworks.twars.mapper.UserMapper;

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
public class LoginResource extends Resource {

    @Inject
    private UserMapper userMapper;

    @Inject
    private LoginDetailMapper loginDetailMapper;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(User user) {

        Pattern mobilePhoneMatches = Pattern
                .compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");
        Matcher mobilePhoneMatcher = mobilePhoneMatches.matcher(user.getEmail());
        String emailMatches = "\\p{Alpha}\\w{2,15}[@][a-z0-9]{3,}[.]\\p{Lower}{2,}";

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
}
