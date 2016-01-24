package com.thoughtworks.twars.service.quiz.quizScoreSheet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.thoughtworks.twars.bean.HomeworkPostHistory;
import com.thoughtworks.twars.bean.HomeworkSubmit;
import com.thoughtworks.twars.mapper.HomeworkPostHistoryMapper;
import com.thoughtworks.twars.mapper.HomeworkSubmitMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)

public class HomeworkQuizScoreSheetTest {

    @Mock
    HomeworkPostHistoryMapper homeworkPostHistoryMapper;

    @Mock
    HomeworkSubmitMapper homeworkSubmitMapper;

    @Mock
    HomeworkPostHistory homeworkPostHistory;

    @Mock
    HomeworkSubmit homeworkSubmit;

    @InjectMocks
    HomeworkQuizScoreSheet homeworkQuizScoreSheet;

    @Test
    public void should_return_homework_list() {
        Gson gson = new GsonBuilder().create();
        when(homeworkSubmitMapper.findByScoreSheetId(1))
                .thenReturn(Arrays.asList(homeworkSubmit));
        when(homeworkSubmit.getHomeworkQuizId()).thenReturn(3);
        List<Map> homeworkList = homeworkQuizScoreSheet.getQuizScoreSheet(1);
        String str = gson.toJson(homeworkList);
        assertThat(str, is("[{\"homeworkQuizSubmit\":[],\"homeworkQuiz\":{\"uri\":\"homeworkQuiz/3\"}}]"));
    }

    @Test
    public void should_return_homework_post_history_list() {
        when(homeworkPostHistoryMapper.findByHomeworkSubmitId(1))
                .thenReturn(Arrays.asList(homeworkPostHistory));
        when(homeworkPostHistory.getBranch()).thenReturn("dev");
        when(homeworkPostHistory.getVersion()).thenReturn("ghjkl");
        when(homeworkPostHistory.getStatus()).thenReturn(7);
        when(homeworkPostHistory.getTimestamp()).thenReturn(5678);
        when(homeworkPostHistory.getHomeworkURL())
                .thenReturn("github.com/jingjing");
        Gson gson = new GsonBuilder().create();
        List<Map> homeworkPostHistoryList = homeworkQuizScoreSheet
                .findByHomeworkSubmitId(1);
        String homeworkPostHistoryStr = gson.toJson(homeworkPostHistoryList);
        assertThat(homeworkPostHistoryStr,
                is("[{\"timeStamp\":5678,\"homeworkURL\":\"github.com/jingjing\"," +
                        "\"branch\":\"dev\",\"version\":\"ghjkl\",\"status\":7}]"));
    }

    @Test
    public void insert_homework_score_sheet() {

    }
}