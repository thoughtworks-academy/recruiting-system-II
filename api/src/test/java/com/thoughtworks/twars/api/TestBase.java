package com.thoughtworks.twars.api;

import com.thoughtworks.twars.data.PaperMapper;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.glassfish.jersey.test.TestProperties;

import javax.ws.rs.core.Application;

import static org.mockito.Mockito.mock;

public class TestBase extends JerseyTest {
  protected PaperMapper paperMapper = mock(PaperMapper.class);

  @Override
  protected Application configure() {

    enable(TestProperties.DUMP_ENTITY);

    return new ResourceConfig().register(new AbstractBinder() {

      @Override
      protected void configure() {
        bind(paperMapper).to(PaperMapper.class);

      }
    }).packages("com.thoughtworks.twars");
  }
}
