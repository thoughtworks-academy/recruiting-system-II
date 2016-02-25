package com.thoughtworks.twars.resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import javax.ws.rs.core.Response;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;


@RunWith(MockitoJUnitRunner.class)
public class LogoutResourceTest extends TestBase {
    String basePath = "/logout";

    @Test
    public void should_update_user_detail_when_logout() throws Exception {

        Response response = target(basePath).request().post(null);
        assertThat(response.getStatus(), is(201));
    }
}