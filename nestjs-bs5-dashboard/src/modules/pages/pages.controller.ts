import { Controller, Get, Render, Req } from '@nestjs/common';
import { PageData } from './pages.dtos';
import { Request } from 'express';

@Controller()
export class PagesController {
  @Get('/')
  @Render('login')
  home(): PageData {
    return {
      title: 'Login',
      pageScript: ['login'],
      pageCss: ['auth'],
    };
  }

  @Get('/register')
  @Render('register')
  register(): PageData {
    return {
      title: 'Register',
      pageCss: ['auth'],
    };
  }

  @Get('/forgot-password')
  @Render('forgot-password')
  forgotPassword(): PageData {
    return {
      title: 'Forgot Password',
      pageCss: ['auth'],
    };
  }

  @Get('/dashboard')
  @Render('dashboard/index')
  dashboard(@Req() req: Request): PageData {
    console.log(req.path);
    return {
      title: 'Dashboard',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/layouts/without-menu')
  @Render('dashboard/layouts/without-menu')
  layoutsWithoutMenu(@Req() req: Request): PageData {
    return {
      title: 'Without Menu',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/layouts/without-navbar')
  @Render('dashboard/layouts/without-navbar')
  layoutsWithoutNavbar(@Req() req: Request): PageData {
    return {
      title: 'Without Navbar',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/layouts/container')
  @Render('dashboard/layouts/container')
  layoutsContainer(@Req() req: Request): PageData {
    return {
      title: 'Container',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/layouts/fluid')
  @Render('dashboard/layouts/fluid')
  layoutsFluid(@Req() req: Request): PageData {
    return {
      title: 'Fluid',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/layouts/blank')
  @Render('dashboard/layouts/blank')
  layoutsBlank(@Req() req: Request): PageData {
    return {
      title: 'Blank',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/accounts/settings')
  @Render('dashboard/accounts/settings')
  accountSettings(@Req() req: Request): PageData {
    return {
      title: 'Account Settings',
      pageScript: ['dashboard/accounts/settings'],
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/accounts/notifications')
  @Render('dashboard/accounts/notifications')
  accountNotifications(@Req() req: Request): PageData {
    return {
      title: 'Account Notifications',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/accounts/connections')
  @Render('dashboard/accounts/connections')
  accountConnections(@Req() req: Request): PageData {
    return {
      title: 'Account Connections',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/misc/error')
  @Render('dashboard/misc/error')
  miscError(@Req() req: Request): PageData {
    return {
      title: 'Misc Error',
      pageCss: ['misc'],
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/misc/under-maintenance')
  @Render('dashboard/misc/under-maintenance')
  miscUnderMaintenance(@Req() req: Request): PageData {
    return {
      title: 'Misc Under Maintenance',
      pageCss: ['misc'],
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/cards')
  @Render('dashboard/cards')
  cards(@Req() req: Request): PageData {
    return {
      title: 'Cards',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/accordion')
  @Render('dashboard/ui/accordion')
  accordion(@Req() req: Request): PageData {
    return {
      title: 'Accordion',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/alerts')
  @Render('dashboard/ui/alerts')
  alerts(@Req() req: Request): PageData {
    return {
      title: 'Alerts',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/badges')
  @Render('dashboard/ui/badges')
  badges(@Req() req: Request): PageData {
    return {
      title: 'Badges',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/buttons')
  @Render('dashboard/ui/buttons')
  buttons(@Req() req: Request): PageData {
    return {
      title: 'Buttons',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/carousel')
  @Render('dashboard/ui/carousel')
  carousel(@Req() req: Request): PageData {
    return {
      title: 'Carousel',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/collapse')
  @Render('dashboard/ui/collapse')
  collapse(@Req() req: Request): PageData {
    return {
      title: 'Collapse',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/dropdowns')
  @Render('dashboard/ui/dropdowns')
  dropdowns(@Req() req: Request): PageData {
    return {
      title: 'Dropdowns',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/footer')
  @Render('dashboard/ui/footer')
  footer(@Req() req: Request): PageData {
    return {
      title: 'Footer',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/list-groups')
  @Render('dashboard/ui/list-groups')
  listGroups(@Req() req: Request): PageData {
    return {
      title: 'List Groups',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/modals')
  @Render('dashboard/ui/modals')
  modal(@Req() req: Request): PageData {
    return {
      title: 'Modal',
      pageScript: ['dashboard/ui/modals'],
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/navbar')
  @Render('dashboard/ui/navbar')
  navbar(@Req() req: Request): PageData {
    return {
      title: 'Navbar',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/offcanvas')
  @Render('dashboard/ui/offcanvas')
  offcanvas(@Req() req: Request): PageData {
    return {
      title: 'Offcanvas',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/pagination-and-breadcrumbs')
  @Render('dashboard/ui/pagination-and-breadcrumbs')
  paginationAndBreadcrumbs(@Req() req: Request): PageData {
    return {
      title: 'Pagination and Breadcrumbs',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/progress')
  @Render('dashboard/ui/progress')
  progress(@Req() req: Request): PageData {
    return {
      title: 'Progress',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/spinners')
  @Render('dashboard/ui/spinners')
  spinner(@Req() req: Request): PageData {
    return {
      title: 'Spinners',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/tabs-and-pills')
  @Render('dashboard/ui/tabs-and-pills')
  tabsAndPills(@Req() req: Request): PageData {
    return {
      title: 'Tabs And Pills',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/toasts')
  @Render('dashboard/ui/toasts')
  toasts(@Req() req: Request): PageData {
    return {
      title: 'Toasts',
      pageScript: ['dashboard/ui/toasts'],
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/tooltips-and-popovers')
  @Render('dashboard/ui/tooltips-and-popovers')
  tooltipsAndPopovers(@Req() req: Request): PageData {
    return {
      title: 'Tooltips And Popovers',
      pageScript: ['dashboard/ui/tooltips-and-popovers'],
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/ui/typography')
  @Render('dashboard/ui/typography')
  typography(@Req() req: Request): PageData {
    return {
      title: 'Typography',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/extended-ui/perfect-scrollbar')
  @Render('dashboard/extended-ui/perfect-scrollbar')
  perfectScrollbar(@Req() req: Request): PageData {
    return {
      title: 'Perfect Scrollbar',
      pageScript: ['dashboard/extended-ui/perfect-scrollbar'],
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/extended-ui/text-divider')
  @Render('dashboard/extended-ui/text-divider')
  textDivider(@Req() req: Request): PageData {
    return {
      title: 'Text Divider',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/boxicons')
  @Render('dashboard/boxicons')
  boxicons(@Req() req: Request): PageData {
    return {
      title: 'Box Icons',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/form-elements/basic-inputs')
  @Render('dashboard/form-elements/basic-inputs')
  basicInputs(@Req() req: Request): PageData {
    return {
      title: 'Basic Inputs',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/form-elements/input-groups')
  @Render('dashboard/form-elements/input-groups')
  inputGroups(@Req() req: Request): PageData {
    return {
      title: 'Input Groups',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/form-layouts/vertical-form')
  @Render('dashboard/form-layouts/vertical-form')
  verticalForm(@Req() req: Request): PageData {
    return {
      title: 'Vertical Form',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/form-layouts/horizontal-form')
  @Render('dashboard/form-layouts/horizontal-form')
  horizontalForm(@Req() req: Request): PageData {
    return {
      title: 'Horizontal Form',
      activeRoute: req.path,
    };
  }

  @Get('/dashboard/tables')
  @Render('dashboard/tables')
  tables(@Req() req: Request): PageData {
    return {
      title: 'Horizontal Form',
      activeRoute: req.path,
    };
  }
}
