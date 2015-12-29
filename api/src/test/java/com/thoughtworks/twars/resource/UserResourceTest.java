package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.User;
import com.thoughtworks.twars.mapper.UserMapper;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Map;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserResourceTest extends TestBase{
  User user = mock(User.class);
  String basePath = "/user";

  @Test
  public void should_return_user(){
    when(userMapper.getUserById(1)).thenReturn(user);

    when(user.getId()).thenReturn(1);
    when(user.getEmail()).thenReturn("111@222.com");
    when(user.getMobilePhone()).thenReturn("13111111111");

    Response response = target(basePath+"/1").request().get();

    assertThat(response.getStatus(),is(200));

    Map user = response.readEntity(Map.class);

    assertThat((int)user.get("id"), is(1));
    assertThat((String)user.get("email"), is("111@222.com"));
    assertThat((String)user.get("mobilePhone"), is("13111111111"));
  }

  @Test
  public void should_return_user_by_field(){
    when(userMapper.getUserByEmail(anyString())).thenReturn(user);
    when(user.getId()).thenReturn(10);

    Response response = target(basePath)
            .queryParam("field", "email")
            .queryParam("value", "abc@test.com")
            .request().get();

    assertThat(response.getStatus(),is(200));

    Map result = response.readEntity(Map.class);

    assertThat((String)result.get("uri"), is("user/10"));

  }

  @Test
  public void should_return_404_when_not_found() throws Exception {
    when(userMapper.getUserByEmail(anyString())).thenReturn(null);

    Response response = target(basePath)
            .queryParam("field", "email")
            .queryParam("value", "abc@test.com")
            .request().get();

    assertThat(response.getStatus(),is(404));
  }
}