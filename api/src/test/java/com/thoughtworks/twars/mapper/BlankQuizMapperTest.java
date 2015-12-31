package com.thoughtworks.twars.mapper;


import com.thoughtworks.twars.bean.BlankQuiz;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class BlankQuizMapperTest {

  private BlankQuizMapper blankQuizMapper;

  @Before
  public void setUp() throws Exception {
    SqlSession session = DBUtil.getSession();
    blankQuizMapper = session.getMapper(BlankQuizMapper.class);
  }

  @After
  public void tearDown() throws Exception {

  }

  @Test
  public void should_return_all_blankQuizzes() throws Exception {
    List<BlankQuiz> blankQuizzes = blankQuizMapper.findAll();
    assertThat(blankQuizzes.size(),is(6));
  }

  @Test
  public void should_return_some_blank_quizzes_by_given_section_id() throws Exception {
    List<BlankQuiz> blankQuizzes = blankQuizMapper.findBySectionId(1);
    assertThat(blankQuizzes.size(),is(4));
  }
}
