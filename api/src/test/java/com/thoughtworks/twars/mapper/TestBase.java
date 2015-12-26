package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.apache.ibatis.session.SqlSession;
import org.junit.Before;
import org.junit.Test;

import java.sql.Connection;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

public class TestBase {
    @Before
    public void setUp() throws Exception {
        SqlSession session = DBUtil.getSession();
        Connection connection = session.getConnection();
        ScriptRunner runner = new ScriptRunner(connection);

        String sourcePath = this.getClass().getClassLoader().getResource("./seeds").getPath();
        System.out.println(sourcePath);

        String[] paths = new String[]{"./seeds", "./db.migration"};
        List<String> pathList = Arrays.asList(paths);


//        Files.walk(Paths.get(sourcePath))
//                .flatMap(filePath -> {
//                    try {
//                        System.out.println(filePath);
//                        return Files.walk(Paths.get(filePath.toUri()));
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    } finally {
//                        return null;
//                    }
//                })
//                .forEach(filePath -> {
//                    System.out.println(filePath);
//                });
//                            .forEach();
//              .filter(filePath -> {
//            return filePath.toString().endsWith(".sql");
//        }).forEach(filePath -> {
//            try {
//                Reader reader = Resources.getResourceAsReader(filePath.toString());
//                runner.runScript(reader);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
////            System.out.println(filePath);
//        });

//        System.out.println(sourcePath);


                }

        @Test
    public void testName() throws Exception {

        assertThat(1, is(1));
    }
}
