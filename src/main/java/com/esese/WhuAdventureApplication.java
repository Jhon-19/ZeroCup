package com.esese;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.esese.repository")
@SpringBootApplication
public class WhuAdventureApplication {

    public static void main(String[] args) {
        SpringApplication.run(WhuAdventureApplication.class, args);

    }

}
