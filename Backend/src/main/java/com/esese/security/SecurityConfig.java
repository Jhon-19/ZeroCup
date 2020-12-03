package com.esese.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    JpaUserDetailService userDetailService;

    @Autowired
    public SecurityConfig(JpaUserDetailService userDetailService){
        this.userDetailService=userDetailService;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/","/images/**","/jquery/*","/styles/*","/audios/*",
                        "/htmls/register.html","/htmls/login.html","/register","/htmls/login","/login",
                        "/htmls/loginfail.html","/index.html").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginProcessingUrl("/login").permitAll()
                .loginPage("/htmls/login.html").permitAll()
                .defaultSuccessUrl("/index.html")
                .failureForwardUrl("/htmls/loginfail.html").permitAll()
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and().csrf().disable();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        return userDetailService;
    }
    @Autowired
    public void configure(AuthenticationManagerBuilder builder)throws Exception{
        builder.userDetailsService(userDetailService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }
}
