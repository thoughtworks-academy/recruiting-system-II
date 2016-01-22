package com.thoughtworks.twars.service.quiz.quizScoreSheet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.thoughtworks.twars.bean.BlankQuizSubmit;
import com.thoughtworks.twars.bean.ItemPost;
import com.thoughtworks.twars.mapper.BlankQuizSubmitMapper;
import com.thoughtworks.twars.mapper.ItemPostMapper;
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
import static org.mockito.Matchers.isNotNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class BlankQuizScoreSheetTest {

    @Mock
    BlankQuizSubmitMapper blankQuizSubmitMapper;

    @Mock
    ItemPostMapper itemPostMapper;

    @Mock
    ItemPost itemPost;

    @Mock
    BlankQuizSubmit blankQuizSubmit;

    @InjectMocks
    BlankQuizScoreSheet blankQuizScoreSheet;

    @Test
    public void should_return_blank_quiz_list() {
        Gson gson = new GsonBuilder().create();
        when(blankQuizSubmitMapper.findByScoreSheetId(1))
                .thenReturn(Arrays.asList(blankQuizSubmit));
        when(blankQuizSubmit.getBlankQuizId()).thenReturn(2);
        List<Map> blankQuizList =  blankQuizScoreSheet.getQuizScoreSheet(1);
        String str = gson.toJson(blankQuizList);
        assertThat(str, is("[{\"blankQuiz\":{\"uri\":\"/blankQuiz/2\"},\"itemPosts\":[]}]"));
    }

    @Test
    public void should_return_item_post_list() {
        when(itemPostMapper.findByBlankQuizSubmit(1))
                .thenReturn(Arrays.asList(itemPost));
        when(itemPost.getAnswer()).thenReturn("success");
        when(itemPost.getQuizItemId()).thenReturn(3);

        Gson gson = new GsonBuilder().create();
        List<Map> itemPosts = blankQuizScoreSheet.getByBlankQuizSubmitId(1);
        String itemPostStr = gson.toJson(itemPosts);
        assertThat(itemPostStr, is("[{\"answer\":\"success\",\"quizItem\":{\"uri\":\"quizItem/3\"}}]"));

    }
}