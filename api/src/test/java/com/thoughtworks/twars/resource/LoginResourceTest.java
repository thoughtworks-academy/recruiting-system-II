package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.User;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class LoginResourceTest extends TestBase{
    String basePath = "/login";
    @Test
    public void should_create_user_when_login() throws Exception {

        User loginUser = new User();
        loginUser.setEmail("test@163.com");
        loginUser.setPassword("25d55ad283aa400af464c76d713c07ad");

        Entity entity = Entity.entity(loginUser, MediaType.APPLICATION_JSON_TYPE);
        Response response = target(basePath).request().post(entity);
        assertThat(response.getStatus(), is(200));

        Map result = response.readEntity(Map.class);

        int userId = (int) result.get("id");
        String userInfoUri = (String) ((Map) result.get("userInfo")).get("uri");

        assertThat(userId, is(1));
        assertThat(userInfoUri, is("user/1"));
    }

    @Test
    public void should_return_404_when_not_find_user() throws Exception {
        User loginUser = new User();
        loginUser.setEmail("test7@163.com");
        loginUser.setPassword("25d55ad283aa400af464c76d713c07ad");

        Entity entity = Entity.entity(loginUser, MediaType.APPLICATION_JSON_TYPE);
        Response response = target(basePath).request().post(entity);
        assertThat(response.getStatus(), is(401));
    }

}