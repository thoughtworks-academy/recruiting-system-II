package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.Section;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class SectionMapperTest extends TestBase{

    private SectionMapper sectionMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        sectionMapper = session.getMapper(SectionMapper.class);
    }

    @Test
    public void should_return_section_by_paper_id() throws Exception {

        List<Section> sections = sectionMapper.getSectionsByPaperId(1);
        assertThat(sections.size(), is(2));
    }
}