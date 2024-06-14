import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @Render("home/home")
  root() {
    return { title: "Home Page" };
  }

  @Get("/about")
  @Render("about/about")
  about() {
    return { title: "About Page" };
  }
}
