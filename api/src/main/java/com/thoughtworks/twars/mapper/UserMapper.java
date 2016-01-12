package com.thoughtworks.twars.mapper;

import com.thoughtworks.twars.bean.User;
import com.thoughtworks.twars.bean.UserDetail;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {

    public int insertUser(User user);

    public User getUserById(int id);

    public User getUserByEmail(String email);

    public User getUserByMobilePhone(String mobilePhone);

    public User getUserByEmailAndPassWord(User user);

    public UserDetail getUserDetailById(int userId);

    public int updateUserDetail(UserDetail detail);

    public int updatePassword(
            @Param("id")int id,
            @Param("oldPassword")String oldPassword,
            @Param("password")String password);
}
