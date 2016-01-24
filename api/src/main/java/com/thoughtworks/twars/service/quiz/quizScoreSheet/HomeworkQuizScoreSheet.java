package com.thoughtworks.twars.service.quiz.quizScoreSheet;

import com.thoughtworks.twars.bean.HomeworkPostHistory;
import com.thoughtworks.twars.bean.HomeworkSubmit;
import com.thoughtworks.twars.mapper.HomeworkPostHistoryMapper;
import com.thoughtworks.twars.mapper.HomeworkSubmitMapper;

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
    public void insertQuizScoreSheet(Map data, int scoreSheetId) {

        Map homeworkSubmitPostHishtory;
        int homeworkQuizId;
        List<Map> homeworkSubmits = (List<Map>) data.get("homeworkSubmits");

        for (int i = 0; i < homeworkSubmits.size(); i++) {
            homeworkQuizId = (int) homeworkSubmits.get(i).get("homeworkQuizId");

            HomeworkSubmit homeworkSubmit = new HomeworkSubmit();
            homeworkSubmit.setScoreSheetId(scoreSheetId);
            homeworkSubmit.setHomeworkQuizId(homeworkQuizId);

            homeworkSubmitMapper.insertHomeworkSubmit(homeworkSubmit);

            homeworkSubmitPostHishtory = (Map) homeworkSubmits.get(i).get("homeworkSubmitPostHishtory");

            HomeworkPostHistory homeworkPostHistory = new HomeworkPostHistory();
            homeworkPostHistory.setBranch((String) homeworkSubmitPostHishtory.get("branch"));
            homeworkPostHistory.setVersion((String) homeworkSubmitPostHishtory.get("version"));
            homeworkPostHistory.setHomeworkURL((String) homeworkSubmitPostHishtory.get("homeworkURL"));
            homeworkPostHistory.setStatus((Integer) homeworkSubmitPostHishtory.get("status"));
            homeworkPostHistory.setTimestamp((Integer) homeworkSubmitPostHishtory.get("timestamp"));
            homeworkPostHistory.setHomeworkSubmitId(homeworkSubmit.getId());

            homeworkPostHistoryMapper.insertHomeworkPostHistory(homeworkPostHistory);
        }

    }

}
