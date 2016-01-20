package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.HomeworkPostHistory;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class HomeworkPostHistoryMapperTest extends TestBase {
    private HomeworkPostHistoryMapper homeworkPostHistoryMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        homeworkPostHistoryMapper = session.getMapper(HomeworkPostHistoryMapper.class);
    }

    @Test
    public void should_return_id_when_insert_homework_post_history(){
        HomeworkPostHistory homeworkPostHistory = new HomeworkPostHistory();
        homeworkPostHistory.setHomeworkSubmitId(1);
        homeworkPostHistory.setStatus(3);
        homeworkPostHistory.setHomeworkURL("github.com/anlihuer/1");
        homeworkPostHistory.setVersion("commit d8160f56ebbb5d40368048f271328eefa87cb");
        homeworkPostHistory.setBranch("master");
        homeworkPostHistory.setTimestamp(1453287441);

        homeworkPostHistoryMapper.insertHomeworkPostHistory(homeworkPostHistory);

        assertThat(homeworkPostHistory.getId(), is(5));
    }
}
