package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.ScoreSheet;

import java.util.List;

public interface ScoreSheetMapper {
    int insertScoreSheet(ScoreSheet scoreSheet);

    List<ScoreSheet> findAll();
}
