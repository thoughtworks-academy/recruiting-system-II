package com.thoughtworks.twars;

import com.thoughtworks.twars.data.UserMapper;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("resources")
public class App extends ResourceConfig {
    public App() {

        SqlSession session = DBUtil.getSession();
        UserMapper userMapper = session.getMapper(com.thoughtworks.twars.data.UserMapper.class);

        packages("com.thoughtworks.twars.api")
            .register(new AbstractBinder() {
                @Override
                protected void configure() {
                    bind(userMapper).to(UserMapper.class);
                }
            });
    }
}
