package com.thoughtworks.twars.filter;

import org.apache.ibatis.session.SqlSession;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import java.io.IOException;

public class OpenSessionRequestFilter  implements ContainerRequestFilter{
    @Inject
    SqlSession sqlSession;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

    }
}
