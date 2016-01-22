package com.thoughtworks.twars.service.quiz.quizScoreSheet;

import com.thoughtworks.twars.mapper.*;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.glassfish.jersey.test.TestProperties;
import org.junit.Before;

import javax.ws.rs.core.Application;

import static org.mockito.Mockito.mock;

public class TestBase extends JerseyTest{
    protected BlankQuizSubmitMapper blankQuizSubmitMapper = mock(BlankQuizSubmitMapper.class);
    protected ItemPostMapper itemPostMapper = mock(ItemPostMapper.class);
    protected HomeworkSubmitMapper homeworkSubmitMapper = mock(HomeworkSubmitMapper.class);
    protected HomeworkPostHistoryMapper homeworkPostHistoryMapper = mock(HomeworkPostHistoryMapper.class);

    private class ServiceBinder extends AbstractBinder {
        @Override
        protected void configure() {
            bind(itemPostMapper).to(ItemPostMapper.class);
//            bind(homeworkPostHistoryMapper).to(HomeworkPostHistoryMapper.class);
//            bind(homeworkSubmitMapper).to(HomeworkSubmitMapper.class);
//            bind(blankQuizSubmitMapper).to(BlankQuizSubmitMapper.class);
        }
    }

    @Override
    protected Application configure() {

        enable(TestProperties.DUMP_ENTITY);

        ServiceBinder binder = new ServiceBinder();

        Application result = new ResourceConfig().register(binder).packages("com.thoughtworks.twars.service.quiz.quizScoreSheet");

        binder.configure();

        return result;

    }
}
