package com.thoughtworks.twars.tasks;

import com.thoughtworks.twars.util.DBUtil;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.apache.ibatis.session.SqlSession;

import java.io.IOException;
import java.io.Reader;
import java.sql.Connection;

public final class DBRecovery {

    private DBRecovery() {}

    public static void main(String[] args) throws IOException {
        SqlSession session = DBUtil.getSession();
        Connection connection = session.getConnection();
        ScriptRunner runner = new ScriptRunner(connection);

        Reader reader = Resources.getResourceAsReader("./seeds/master.sql");
        runner.runScript(reader);
    }
}
