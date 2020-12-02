package com.esese.controller;

import com.esese.entity.User;
import com.esese.repository.userRepository;
import com.esese.security.userPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class userController {
    userRepository userRepo;

    @Autowired
    public userController(userRepository userRepo){
        this.userRepo=userRepo;
    }

    @PostMapping("/getdata")
    public String getData(@RequestParam(value = "type",required = false,defaultValue = "")String type){
        User user=getCurrentUser();
        if(user==null)
            return "错误：请先登录";
        if(type.equals(""))
            return user.dataToString();
        try {
            User.dataType dt = User.dataType.valueOf(type);
            return user.isComplete(dt)?"true":"false";
        }catch (IllegalArgumentException e){
            return "参数错误："+type;
        }
    }

    @PostMapping("/register")
    public synchronized String register(@RequestParam("username")String username,@RequestParam("password") String password){
        if(userRepo.findByUsername(username)!=null)
            return "错误：用户名已存在";
        if(password.length()<8)
            return "错误：密码不能小于8位";
        User user=new User();
        user.setUsername(username);
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        userRepo.save(user);
        return "成功";
    }

    @PostMapping("/setdata")
    public String setData(@RequestParam("type")String type){
        User user=getCurrentUser();
        if(user==null)
            return "错误：请先登录";
        try {
            User.dataType dt = User.dataType.valueOf(type);
            user.setComplete(dt);
            userRepo.updateDataByUsername(user.getData(),user.getUsername());
            return "成功";
        }catch (IllegalArgumentException e){
            return "参数错误："+type;
        }
    }

    public User getCurrentUser(){
        return ((userPrincipal)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
    }
}
