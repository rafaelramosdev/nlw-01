import { Request, Response } from 'express';

import db from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const items = await db('items').select('*'); 
  
    const serializedItems = items.map(item => { 
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });
  
    return response.json(serializedItems);
  }
}