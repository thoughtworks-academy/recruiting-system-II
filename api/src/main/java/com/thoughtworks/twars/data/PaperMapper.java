package com.thoughtworks.twars.data;

import com.thoughtworks.twars.bean.Paper;

import java.util.List;

public interface PaperMapper {
  List<Paper> findPapers();
}
