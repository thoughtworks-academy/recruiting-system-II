package com.thoughtworks.twars.resource;

public class HomeworkResourceTest extends TestBase {

    String basePath = "homeworkQuizzes/";

//    @Test
//    public void should_return_all_home_work_quiz_items() {
//        HomeworkQuizItem homeworkQuizItem = mock(HomeworkQuizItem.class);
//
//        when(homeworkQuizItemMapper.findByHomeworkQuizId(anyInt())).thenReturn(Arrays.asList(homeworkQuizItem));
//        when(homeworkQuizItem.getId()).thenReturn(1);
//        when(homeworkQuizItem.getDescription()).thenReturn("bnm,");
//        when(homeworkQuizItem.getEvaluateRepository()).thenReturn("vbnm,");
//        when(homeworkQuizItem.getEvaluateScript()).thenReturn("gloj");
//        when(homeworkQuizItem.getHomeworkQuizId()).thenReturn(3);
//        when(homeworkQuizItem.getTemplateRepository()).thenReturn("guiop");
//        Response response = target(basePath + "1/items").request().get();
//        assertThat(response.getStatus(), is(200));
//
//        Map<String, List> result = response.readEntity(Map.class);
//        List<Map> homeworkItems = (List) result.get("homeworkQuizItems");
//
//        assertThat(homeworkItems.size(), is(1));
//        assertThat(homeworkItems.get(0).get("id"), is(1));
//        assertThat(homeworkItems.get(0).get("description"), is("bnm,"));
//        assertThat(homeworkItems.get(0).get("evaluateRepository"), is("vbnm,"));
//        assertThat(homeworkItems.get(0).get("evaluateScript"), is("gloj"));
//        assertThat(homeworkItems.get(0).get("homeworkQuizId"), is(3));
//        assertThat(homeworkItems.get(0).get("templateRepository"), is("guiop"));
//    }
}