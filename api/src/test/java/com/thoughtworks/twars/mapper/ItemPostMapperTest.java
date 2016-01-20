package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.ItemPost;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class ItemPostMapperTest extends TestBase {

    private ItemPostMapper itemPostMapper;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        itemPostMapper = session.getMapper(ItemPostMapper.class);
    }

    @After
    public void tearDown() throws Exception {
        super.tearDown();
    }

    @Test
    public void should_return_id_when_insert_item_post(){
        ItemPost itemPost = new ItemPost();
        itemPost.setBlankQuizSubmitsId(1);
        itemPost.setAnswer("22");
        itemPost.setQuizItemId(1);

        itemPostMapper.insertItemPost(itemPost);

        assertThat(itemPost.getId(), is(7));
    }
}
