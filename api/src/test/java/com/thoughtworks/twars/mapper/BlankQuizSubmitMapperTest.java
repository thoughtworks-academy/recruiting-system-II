package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.BlankQuizSubmit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class BlankQuizSubmitMapperTest extends TestBase{
    private BlankQuizSubmitMapper blankQuizSubmitMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        blankQuizSubmitMapper = session.getMapper(BlankQuizSubmitMapper.class);
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
    }

    @Test
    public void should_return_id_when_insert_blank_quiz_submit(){
        BlankQuizSubmit blankQuizSubmit = new BlankQuizSubmit();
        blankQuizSubmit.setScoreSheetId(1);
        blankQuizSubmit.setBlankQuizId(2);

        blankQuizSubmitMapper.insertBlankQuizSubmit(blankQuizSubmit);
        assertThat(blankQuizSubmit.getId(), is(5));
    }

    @Test
    public void should_return_one_blank_quiz_submit() {
        BlankQuizSubmit blankQuizSubmit = blankQuizSubmitMapper.findOne(1);

        assertThat(blankQuizSubmit.getId(), is(1));
        assertThat(blankQuizSubmit.getBlankQuizId(), is(1));
    }
}
