package com.thoughtworks.twars.filter;

import org.apache.ibatis.session.SqlSessionManager;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import java.io.IOException;

public class CloseSessionResponseFilter implements ContainerResponseFilter{

    @Inject
    SqlSessionManager sqlSessionManager;

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {

        sqlSessionManager.close();
    }
}
