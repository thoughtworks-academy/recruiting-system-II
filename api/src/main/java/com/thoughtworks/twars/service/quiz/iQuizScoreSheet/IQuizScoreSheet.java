package com.thoughtworks.twars.service.quiz.iQuizScoreSheet;

import java.util.List;
import java.util.Map;

public interface IQuizScoreSheet {
    //获取成绩单
    List<Map> getQuizScoreSheet(int scoreSheetId);
    //写入成绩单
    int insertQuizScoreSheet(Map data);
}
