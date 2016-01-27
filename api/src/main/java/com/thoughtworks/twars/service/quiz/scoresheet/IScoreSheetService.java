package com.thoughtworks.twars.service.quiz.scoresheet;

import java.util.List;
import java.util.Map;

public interface IScoreSheetService {

    List<Map> getQuizScoreSheet(int scoreSheetId);

    void insertQuizScoreSheet(Map data, int scoreSheetId);
}
