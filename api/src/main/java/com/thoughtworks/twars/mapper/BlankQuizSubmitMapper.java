package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.BlankQuizSubmit;

public interface BlankQuizSubmitMapper {
    int insertBlankQuizSubmit(BlankQuizSubmit blankQuizSubmit);
    BlankQuizSubmit findOne(int scoreSheetId);
}
