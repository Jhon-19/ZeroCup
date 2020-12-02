package com.esese.repository;

import com.esese.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface userRepository extends CrudRepository<User,Integer> {

    User findByUsername(String username);

    User findById(int id);

    @Query("update User user set user.data=?1 where user.username=?2")
    @Modifying(clearAutomatically = true,flushAutomatically = true)
    @Transactional()
    void updateDataByUsername(int data, String username);
}
