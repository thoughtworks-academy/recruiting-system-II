package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.User;
import com.thoughtworks.twars.bean.UserDetail;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserResourceTest extends TestBase {
    User user = mock(User.class);
    String basePath = "/user";

    @Test
    public void should_return_user() {
        when(userMapper.getUserById(1)).thenReturn(user);

        when(user.getId()).thenReturn(1);
        when(user.getEmail()).thenReturn("111@222.com");
        when(user.getMobilePhone()).thenReturn("13111111111");

        Response response = target(basePath + "/1").request().get();

        assertThat(response.getStatus(), is(200));

        Map result = response.readEntity(Map.class);

        assertThat((Integer) result.get("id"), is(1));
        assertThat((String) result.get("email"), is("111@222.com"));
        assertThat((String) result.get("mobilePhone"), is("13111111111"));
    }

    @Test
    public void should_return_user_by_field() {
        when(userMapper.getUserByEmail(anyString())).thenReturn(user);
        when(user.getId()).thenReturn(10);

        Response response = target(basePath)
                .queryParam("field", "email")
                .queryParam("value", "abc@test.com")
                .request().get();

        assertThat(response.getStatus(), is(200));

        Map result = response.readEntity(Map.class);

        assertThat((String) result.get("uri"), is("user/10"));

    }

    @Test
    public void should_return_404_when_not_found() throws Exception {
        when(userMapper.getUserByEmail(anyString())).thenReturn(null);

        Response response = target(basePath)
                .queryParam("field", "email")
                .queryParam("value", "abc@test.com")
                .request().get();

        assertThat(response.getStatus(), is(404));
    }

    @Test
    public void should_return_user_detail_by_user_id() throws Exception {

        UserDetail theDetail = mock(UserDetail.class);

        when(userMapper.getUserDetailById(1)).thenReturn(theDetail);
        when(theDetail.getUserId()).thenReturn(1);
        when(theDetail.getSchool()).thenReturn("哈佛");
        when(theDetail.getMajor()).thenReturn("宗教");
        when(theDetail.getDegree()).thenReturn("博士");
        when(theDetail.getName()).thenReturn("狗剩");
        when(theDetail.getGender()).thenReturn("男");

        Response response = target(basePath + "/1/detail").request().get();

        assertThat(response.getStatus(), is(200));

        Map result = response.readEntity(Map.class);

        assertThat(result.get("userId"), is(1));
        assertThat(result.get("school"), is("哈佛"));
        assertThat(result.get("major"), is("宗教"));
        assertThat(result.get("degree"), is("博士"));
        assertThat(result.get("name"), is("狗剩"));
        assertThat(result.get("gender"), is("男"));
    }

    @Test
    public void should_update_user_detail() throws Exception {
        UserDetail updateUserDetail = new UserDetail();

        updateUserDetail.setUserId(2);

        Entity<UserDetail> entityUserDetail= Entity.entity(updateUserDetail, MediaType.APPLICATION_JSON_TYPE);
        Response response = target(basePath + "/2/detail").request().put(entityUserDetail);

        assertThat(response.getStatus(), is(200));

        Map result = response.readEntity(Map.class);
        assertThat(result.get("uri"),is("userDetail/2"));

    }

    @Test
    public void should_insert_user_detail() throws Exception {
        UserDetail insertUserDetail = new UserDetail();

        insertUserDetail.setUserId(18);
        insertUserDetail.setBirthday(2);
        insertUserDetail.setDegree("benke");
        insertUserDetail.setGender("F");
        insertUserDetail.setMajor("cs");
        insertUserDetail.setName("purple");
        insertUserDetail.setSchool("shannxi");

        Entity<UserDetail> entityUserDetail= Entity.entity(insertUserDetail, MediaType.APPLICATION_JSON_TYPE);
        Response response = target(basePath + "/18/detail").request().put(entityUserDetail);

        assertThat(response.getStatus(), is(200));

        Map result = response.readEntity(Map.class);
        assertThat(result.get("uri"),is("userDetail/18"));
    }

    @Test
    public void should_return_404_when_get_no_detail() throws Exception {

        when(userMapper.getUserDetailById(anyInt())).thenReturn(null);

        Response response = target(basePath + "/99/detail").request().get();

        assertThat(response.getStatus(), is(404));
    }
}