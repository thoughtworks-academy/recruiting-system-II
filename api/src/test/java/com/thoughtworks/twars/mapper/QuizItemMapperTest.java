package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.QuizItem;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class QuizItemMapperTest {
  private QuizItemMapper quizItemMapper;
  private SqlSession session;

  @Before
  public void setUp() throws Exception {
    session = DBUtil.getSession();
    session.getConnection().setAutoCommit(false);
    quizItemMapper = session.getMapper(QuizItemMapper.class);
  }

  @After
  public void tearDown() throws Exception {
    session.rollback();
    session.close();
  }

  @Test
  public void should_return_a_quizItem() throws Exception{
    QuizItem quizItem = quizItemMapper.getQuizItemById(1);

    assertThat(quizItem.getInitializedBox(),is("[0,2,7,2,1,5,7,1,4,8]"));
    assertThat(quizItem.getCount(),is(33));
  }
}
