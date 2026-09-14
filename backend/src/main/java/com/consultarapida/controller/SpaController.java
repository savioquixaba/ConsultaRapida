package com.consultarapida.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping(value = {"/", "/{path:[^\\.]*}", "/{p1}/{p2:[^\\.]*}"})
    public String forward() {
        return "forward:/index.html";
    }
}
