package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.bean.BlankQuizSubmit;
import com.thoughtworks.twars.mapper.*;
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
  protected SectionMapper sectionMapper = mock(SectionMapper.class);
  protected BlankQuizMapper blankQuizMapper = mock(BlankQuizMapper.class);
  protected ScoreSheetMapper scoreSheetMapper = mock(ScoreSheetMapper.class);
  protected BlankQuizSubmitMapper blankQuizSubmitMapper = mock(BlankQuizSubmitMapper.class);
  protected ItemPostMapper itemPostMapper = mock(ItemPostMapper.class);
  protected HomeWorkQuizMapper homeWorkQuizMapper = mock(HomeWorkQuizMapper.class);
  protected HomeworkQuizItemMapper homeworkQuizItemMapper = mock(HomeworkQuizItemMapper.class);
  protected HomeworkQuizScoreSheetMapper homeworkQuizScoreSheetMapper = mock(HomeworkQuizScoreSheetMapper.class);

  @Override
  protected Application configure() {

    enable(TestProperties.DUMP_ENTITY);

    return new ResourceConfig().register(new AbstractBinder() {

      @Override
      protected void configure() {
        bind(paperMapper).to(PaperMapper.class);
        bind(userMapper).to(UserMapper.class);
        bind(quizItemMapper).to(QuizItemMapper.class);
        bind(sectionMapper).to(SectionMapper.class);
        bind(blankQuizMapper).to(BlankQuizMapper.class);
        bind(scoreSheetMapper).to(ScoreSheetMapper.class);
        bind(blankQuizSubmitMapper).to(BlankQuizSubmitMapper.class);
        bind(itemPostMapper).to(ItemPostMapper.class);
        bind(homeWorkQuizMapper).to(HomeWorkQuizMapper.class);
        bind(homeworkQuizItemMapper).to(HomeworkQuizItemMapper.class);
        bind(homeworkQuizScoreSheetMapper).to(HomeworkQuizScoreSheetMapper.class);
      }
    }).packages("com.thoughtworks.twars.resource");
  }
}
