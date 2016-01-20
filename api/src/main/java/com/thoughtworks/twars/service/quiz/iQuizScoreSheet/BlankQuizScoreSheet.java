package com.thoughtworks.twars.service.quiz.iQuizScoreSheet;

import java.util.List;
import java.util.Map;

public class BlankQuizScoreSheet implements IQuizScoreSheet {
    @Override
    public List<Map> getQuizScoreSheet(int scoreSheetId) {
        return null;
    }

    @Override
    public int insertQuizScoreSheet(Map data) {
        return 0;
    }
}
