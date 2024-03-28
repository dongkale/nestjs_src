import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
    @Get()
    @Render('home')
    showHomePage() {
        return { title: 'Hello from homepage' };
    }

    @Get('about')
    @Render('about')
    showAboutPage() {
        return { title: 'Hello from aboutpage' };
    }
}
