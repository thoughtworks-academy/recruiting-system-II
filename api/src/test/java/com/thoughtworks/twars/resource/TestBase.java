package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.QuizItem;
import com.thoughtworks.twars.mapper.PaperMapper;
import com.thoughtworks.twars.mapper.QuizItemMapper;
import com.thoughtworks.twars.mapper.UserMapper;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.glassfish.jersey.test.TestProperties;

import javax.ws.rs.core.Application;

import static org.mockito.Mockito.mock;

public class TestBase extends JerseyTest {
  protected PaperMapper paperMapper = mock(PaperMapper.class);
  protected UserMapper userMapper = mock(UserMapper.class);
  protected QuizItemMapper quizItemMapper = mock(QuizItemMapper.class);

  @Override
  protected Application configure() {

    enable(TestProperties.DUMP_ENTITY);

    return new ResourceConfig().register(new AbstractBinder() {

      @Override
      protected void configure() {
        bind(paperMapper).to(PaperMapper.class);
        bind(userMapper).to(UserMapper.class);
        bind(quizItemMapper).to(QuizItemMapper.class);


      }
    }).packages("com.thoughtworks.twars.resource");
  }
}
