import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie } from 'src/schema/category.schema';
import { Plat } from 'src/schema/plat.schema';
import { Resto } from 'src/schema/resto.schema';

@Injectable()
export class MenusService {
    constructor(
        @InjectModel(Categorie.name) private readonly categoryModel: Model<Categorie>,
        @InjectModel(Resto.name) private readonly restoModel: Model<Resto>,
        @InjectModel(Plat.name) private readonly platModel: Model<Plat>,
      ) {}
    
      async loadMenuPrincipal() {
        const categories = await this.categoryModel.find().exec();
        console.log('Categories:', categories); // Debugging line
    
        if (!categories.length) {
          throw new NotFoundException('No categories found');
        }
    
        const menu = [];
        for (const category of categories) {
          const restos = await this.restoModel.find({ 'categories.name': category.name }).exec();
          console.log('Restos for category:', category.name, restos); 
    
          if (!restos.length) {
            continue;
          }
    
          const highestRatedPlats = await Promise.all(
            restos.map(async (resto) => {
              const plats = await this.platModel.find({ restoId: resto._id }).sort({ rating: -1 }).limit(1).exec();
              console.log('Plats for resto:', resto._id, plats); // Debugging line
              return plats[0];
            })
          );
    
          menu.push({
            categories,
            restos,
            highestRatedPlats: highestRatedPlats.filter(plat => plat), // Remove undefined plats
          });
        }
    
        console.log('Menu:', menu); // Debugging line
        return menu;
      }
}
