package com.thoughtworks.twars.service.quiz.quizScoreSheet;

import com.thoughtworks.twars.mapper.HomeworkPostHistoryMapper;
import com.thoughtworks.twars.mapper.HomeworkSubmitMapper;
import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.session.SqlSession;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class HomeworkQuizScoreSheet implements IQuizScoreSheet {
    @Inject
    private HomeworkSubmitMapper homeworkSubmitMapper;

    @Inject
    private HomeworkPostHistoryMapper homeworkPostHistoryMapper;

    public void setHomeworkSubmitMapper(HomeworkSubmitMapper homeworkSubmitMapper) {
        this.homeworkSubmitMapper = homeworkSubmitMapper;
    }

    public void setHomeworkPostHistoryMapper(HomeworkPostHistoryMapper homeworkPostHistoryMapper) {
        this.homeworkPostHistoryMapper = homeworkPostHistoryMapper;
    }

    @Override
    public List<Map> getQuizScoreSheet(int scoreSheetId) {
        return homeworkSubmitMapper.findByScoreSheetId(scoreSheetId)
                .stream()
                .map(homeworkQuizSubmit -> {
                    Map<String, Object> homeworkQuizUri = new HashMap<>();
                    homeworkQuizUri.put("uri", "homeworkQuiz/" +
                            homeworkQuizSubmit.getHomeworkQuizId());
                    Map<String, Object> homeworkQuizSubmitUri = new HashMap<>();
                    homeworkQuizSubmitUri.put("homeworkQuiz", homeworkQuizUri);
                    homeworkQuizSubmitUri.put("homeworkQuizSubmit",
                            findByHomeworkSubmitId(homeworkQuizSubmit.getId()));
                    return homeworkQuizSubmitUri;
                })
                .collect(Collectors.toList());
    }

    public List<Map> findByHomeworkSubmitId(int homeworkSubmitId) {
        return homeworkPostHistoryMapper.findByHomeworkSubmitId(homeworkSubmitId)
                .stream()
                .map(homeworkPostHistory -> {
                    Map<String, Object> homeworkPostHistoryUri = new HashMap<>();
                    homeworkPostHistoryUri.put("homeworkURL", homeworkPostHistory.getHomeworkURL());
                    homeworkPostHistoryUri.put("branch", homeworkPostHistory.getBranch());
                    homeworkPostHistoryUri.put("version", homeworkPostHistory.getVersion());
                    homeworkPostHistoryUri.put("timeStamp", homeworkPostHistory.getTimestamp());
                    homeworkPostHistoryUri.put("status", homeworkPostHistory.getStatus());
                    return homeworkPostHistoryUri;
                })
                .collect(Collectors.toList());
    }

    @Override
    public int insertQuizScoreSheet(Map data) {
        return 0;
    }
}
