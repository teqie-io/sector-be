import { CollectionConfig } from 'payload/types';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      required: true
    },
    {
      name: 'type',
      type: 'select',
      options: ['Single cards', 'Sets'],
      defaultValue: 'Single cards',
      index: true
    },
    {
      name: 'sport_type',
      type: 'text',
      index: true
    },
    {
      name: 'year',
      type: 'date',
      index: true
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      required: true
    },
    {
      name: 'league_team',
      type: 'text',
      index: true
    },
    {
      name: 'seller',
      type: 'relationship',
      relationTo: 'users',
      required: true
    },
    {
      name: 'special_feature',
      type: 'text',
      index: true
    },
    {
      name: 'brand',
      type: 'text',
      index: true
    },
    {
      name: 'grade_by',
      type: 'text',
      index: true
    },
  ],
}

export default Products;