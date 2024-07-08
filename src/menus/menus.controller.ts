import { Controller, Get } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
    constructor(private readonly menuService: MenusService) {}

    @Get('principal')
    async loadMenuPrincipal() {
      return this.menuService.loadMenuPrincipal();
    }
}
