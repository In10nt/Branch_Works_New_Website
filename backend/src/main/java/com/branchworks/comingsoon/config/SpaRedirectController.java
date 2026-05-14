package com.branchworks.comingsoon.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaRedirectController {
    
    // Forward all admin routes to index.html for React Router to handle
    @GetMapping(value = {
        "/admin",
        "/admin/",
        "/admin/dashboard",
        "/admin/blogs",
        "/admin/blogs/new",
        "/admin/blogs/edit/*",
        "/admin/careers",
        "/admin/careers/new",
        "/admin/careers/edit/*"
    })
    public String forwardAdminRoutes() {
        return "forward:/admin/index.html";
    }
}
