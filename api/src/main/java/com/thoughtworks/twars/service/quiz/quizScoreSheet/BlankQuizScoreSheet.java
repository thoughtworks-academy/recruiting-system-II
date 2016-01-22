package com.thoughtworks.twars.service.quiz.quizScoreSheet;

import com.thoughtworks.twars.mapper.BlankQuizSubmitMapper;
import com.thoughtworks.twars.mapper.ItemPostMapper;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class BlankQuizScoreSheet implements IQuizScoreSheet {
    @Inject
    private BlankQuizSubmitMapper blankQuizSubmitMapper;

    @Inject
    private ItemPostMapper itemPostMapper;

    public void setBlankQuizSubmitMapper(BlankQuizSubmitMapper blankQuizSubmitMapper) {
        this.blankQuizSubmitMapper = blankQuizSubmitMapper;
    }

    public void setItemPostMapper(ItemPostMapper itemPostMapper) {
        this.itemPostMapper = itemPostMapper;
    }

    @Override
    public List<Map> getQuizScoreSheet(int scoreSheetId) {
        return blankQuizSubmitMapper.findByScoreSheetId(scoreSheetId)
                .stream()
                .map(blankQuizSubmit -> {
                    Map<String, Object> blankQuizUri = new HashMap<>();
                    blankQuizUri.put("uri","/blankQuiz/" + blankQuizSubmit.getBlankQuizId());
                    Map<String, Object> blankQuizSubmitUri = new HashMap<>();
                    blankQuizSubmitUri.put("blankQuiz", blankQuizUri);
                    blankQuizSubmitUri.put("itemPosts",
                            getByBlankQuizSubmitId(blankQuizSubmit.getBlankQuizId()));
                    return blankQuizSubmitUri;
                })
                .collect(Collectors.toList());

    }

    public List<Map> getByBlankQuizSubmitId(int blankQuizSubmitId) {
        return itemPostMapper.findByBlankQuizSubmit(blankQuizSubmitId)
                .stream()
                .map(itemPost -> {
                    Map<String, Object> itemPostUri = new HashMap<>();
                    Map<String, Object> quizItemUri = new HashMap<>();
                    quizItemUri.put("uri", "quizItem/" + itemPost.getQuizItemId());
                    itemPostUri.put("answer", itemPost.getAnswer());
                    itemPostUri.put("quizItem", quizItemUri);
                    return itemPostUri;
                })
                .collect(Collectors.toList());
    }

    @Override
    public int insertQuizScoreSheet(Map data) {
        return 0;
    }
}
