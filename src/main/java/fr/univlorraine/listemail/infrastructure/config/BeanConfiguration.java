package fr.univlorraine.listemail.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import fr.univlorraine.listemail.Application;
import fr.univlorraine.listemail.domain.repository.PersonneRepository;
import fr.univlorraine.listemail.domain.service.DomainPersonneService;
import fr.univlorraine.listemail.domain.service.PersonneService;

@Configuration
@ComponentScan(basePackageClasses = Application.class)
public class BeanConfiguration {

    @Bean
    PersonneService personneService(PersonneRepository personneRepository) {
        return new DomainPersonneService(personneRepository);
    }

}
