package com.branchworks.comingsoon.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve admin panel static files (CSS, JS, etc.)
        registry.addResourceHandler("/admin/static/**")
                .addResourceLocations("classpath:/static/admin/static/");
        
        // Serve admin panel root files (index.html, manifest, etc.)
        registry.addResourceHandler("/admin/**")
                .addResourceLocations("classpath:/static/admin/")
                .resourceChain(false);
    }
}
