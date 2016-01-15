package com.thoughtworks.twars;

import com.thoughtworks.twars.mapper.*;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("resources")
public class App extends ResourceConfig {

    public App() {

        SqlSession session = DBUtil.getSession();
        final UserMapper userMapper = session.getMapper(UserMapper.class);
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

        final HomeWorkQuizMapper homeWorkQuizMapper = session
                .getMapper(HomeWorkQuizMapper.class);


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
                    bind(homeWorkQuizMapper).to(HomeWorkQuizMapper.class);
                }
            });
    }
}
