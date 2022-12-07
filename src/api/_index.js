import { createServer, Model, RestSerializer } from 'miragejs';

const items = [
  'Antlers',
  'Bowling Ball',
  'Coffee/Espresso Maker',
  'Live Lobster Fish',
  'My Desktop Computer (and monitors)',
  'Night Vision Goggles',
  'Fresh Organic Eggs',
  'Sand',
  'Tortilla Press',
  'Christmas Lights',
  'Rumba Vacum Robot',
  'Toothbrush',
  'Toothpaste',
  'Deorderant',
  'Backpack',
  'Vitamins',
  'Kindle',
  'Micro-USB cable',
  'Sleep mask',
  'Ear plugs',
  'Face masks',
];

const ApplicationSerializer = RestSerializer.extend({});

export function makeServer({ environment = 'development' }) {
  return createServer({
    environment,

    serializers: {
      application: ApplicationSerializer.extend(),
    },

    models: {
      item: Model,
    },

    routes() {
      this.timing = 2000;
      this.namespace = 'api';

      this.get('items');
      this.get('items/:id');
      this.put('items/:id');
      this.patch('items/:id');
      this.del('items/:id');
    },

    seeds(server) {
      for (const item of items) {
        server.create('item', {
          name: item,
          packed: !!Math.round(Math.random()),
        });
      }
      console.log(server.db.dump());
    },
  });
}
