package com.thoughtworks.twars.resource;

import com.thoughtworks.twars.mapper.*;
import com.thoughtworks.twars.service.quiz.scoresheet.BlankQuizScoreSheet;
import com.thoughtworks.twars.service.quiz.scoresheet.HomeworkQuizScoreSheet;
import com.thoughtworks.twars.service.quiz.definition.BlankQuizDefinition;
import com.thoughtworks.twars.service.quiz.definition.HomeworkQuizDefinition;
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
    protected HomeworkQuizMapper homeworkQuizMapper = mock(HomeworkQuizMapper.class);
    protected HomeworkSubmitMapper homeworkSubmitMapper = mock(HomeworkSubmitMapper.class);
    protected HomeworkPostHistoryMapper homeworkPostHistoryMapper = mock(HomeworkPostHistoryMapper.class);
    protected HomeworkQuizDefinition homeworkQuizDefinition = mock(HomeworkQuizDefinition.class);
    protected BlankQuizDefinition blankQuizDefinition = mock(BlankQuizDefinition.class);
    protected BlankQuizScoreSheet blankQuizScoreSheet = mock(BlankQuizScoreSheet.class);
    protected HomeworkQuizScoreSheet homeworkQuizScoreSheet = mock(HomeworkQuizScoreSheet.class);


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
                bind(homeworkQuizMapper).to(HomeworkQuizMapper.class);
                bind(homeworkSubmitMapper).to(HomeworkSubmitMapper.class);
                bind(homeworkPostHistoryMapper).to(HomeworkPostHistoryMapper.class);
                bind(homeworkQuizDefinition).to(HomeworkQuizDefinition.class);
                bind(blankQuizDefinition).to(BlankQuizDefinition.class);
                bind(blankQuizScoreSheet).to(BlankQuizScoreSheet.class);
                bind(homeworkQuizScoreSheet).to(HomeworkQuizScoreSheet.class);
            }
        }).packages("com.thoughtworks.twars.resource");
    }

}
