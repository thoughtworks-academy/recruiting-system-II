package com.thoughtworks.twars;

import com.thoughtworks.twars.mapper.*;
import com.thoughtworks.twars.service.quiz.definition.BlankQuizDefinition;
import com.thoughtworks.twars.service.quiz.definition.HomeworkQuizDefinition;
import com.thoughtworks.twars.service.quiz.quizScoreSheet.BlankQuizScoreSheet;
import com.thoughtworks.twars.service.quiz.quizScoreSheet.HomeworkQuizScoreSheet;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("resources")
public class App extends ResourceConfig {

    public App() {

        SqlSession session = DBUtil.getSession();

        final UserMapper userMapper = session
                .getMapper(UserMapper.class);

        final PaperMapper paperMapper =
                session.getMapper(PaperMapper.class);

        final BlankQuizMapper blankQuizMapper = session
                .getMapper(BlankQuizMapper.class);

        final QuizItemMapper quizItemMapper = session
                .getMapper(QuizItemMapper.class);

        final SectionMapper sectionMapper = session
                .getMapper(SectionMapper.class);

        final ScoreSheetMapper scoreSheetMapper = session
                .getMapper(ScoreSheetMapper.class);

        final BlankQuizSubmitMapper blankQuizSubmitMapper = session
                .getMapper(BlankQuizSubmitMapper.class);

        final ItemPostMapper itemPostMapper = session
                .getMapper(ItemPostMapper.class);

        final HomeworkQuizMapper homeworkQuizMapper = session
                .getMapper(HomeworkQuizMapper.class);

        final HomeworkSubmitMapper homeworkSubmitMapper = session
                .getMapper(HomeworkSubmitMapper.class);

        final HomeworkPostHistoryMapper homeworkPostHistoryMapper = session
                .getMapper(HomeworkPostHistoryMapper.class);

        final BlankQuizScoreSheet blankQuizScoreSheet = new BlankQuizScoreSheet();
        blankQuizScoreSheet.setBlankQuizSubmitMapper(blankQuizSubmitMapper);
        blankQuizScoreSheet.setItemPostMapper(itemPostMapper);

        final HomeworkQuizScoreSheet homeworkQuizScoreSheet = new HomeworkQuizScoreSheet();
        homeworkQuizScoreSheet.setHomeworkPostHistoryMapper(homeworkPostHistoryMapper);
        homeworkQuizScoreSheet.setHomeworkSubmitMapper(homeworkSubmitMapper);

        final HomeworkQuizDefinition homeworkQuizDefinition = new HomeworkQuizDefinition();
        homeworkQuizDefinition.setMapper(homeworkQuizMapper);
        homeworkQuizDefinition.setSectionMapper(sectionMapper);

        final BlankQuizDefinition blankQuizDefinition = new BlankQuizDefinition();
        blankQuizDefinition.setBlankQuizMapper(blankQuizMapper);
        blankQuizDefinition.setSectionMapper(sectionMapper);


        packages("com.thoughtworks.twars.resource")
                .register(new AbstractBinder() {
                    @Override
                    protected void configure() {
                        bind(userMapper).to(UserMapper.class);
                        bind(paperMapper).to(PaperMapper.class);
                        bind(blankQuizMapper).to(BlankQuizMapper.class);
                        bind(quizItemMapper).to(QuizItemMapper.class);
                        bind(sectionMapper).to(SectionMapper.class);
                        bind(scoreSheetMapper).to(ScoreSheetMapper.class);
                        bind(blankQuizSubmitMapper).to(BlankQuizSubmitMapper.class);
                        bind(itemPostMapper).to(ItemPostMapper.class);
                        bind(homeworkQuizMapper).to(HomeworkQuizMapper.class);
                        bind(homeworkSubmitMapper).to(HomeworkSubmitMapper.class);
                        bind(homeworkPostHistoryMapper).to(HomeworkPostHistoryMapper.class);
                        bind(blankQuizScoreSheet).to(BlankQuizScoreSheet.class);
                        bind(homeworkQuizScoreSheet).to(HomeworkQuizScoreSheet.class);
                        bind(homeworkQuizDefinition).to(HomeworkQuizDefinition.class);
                        bind(blankQuizDefinition).to(BlankQuizDefinition.class);
                    }
                });
    }
}
