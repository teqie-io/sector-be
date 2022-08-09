import { CollectionConfig } from 'payload/types';

const Product: CollectionConfig = {
  slug: 'product',
  admin: {
    useAsTitle: 'playerName',
    defaultColumns: ['year', 'brand', 'playerName']
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'playerName',
      type: 'text',
      index: true,
      required: true
    },
    {
      name: 'type',
      type: 'select',
      options: ['Single cards', 'Boxes'],
      defaultValue: 'Single cards',
      index: true
    },
    {
      name: 'sportType',
      type: 'text',
      index: true,
      required: true
    },
    {
      name: 'year',
      type: 'date',
      index: true,
      required: true
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      index: true,
      required: true
    },
    {
      name: 'leagueTeam',
      type: 'select',
      options: ['NBA', 'NFL', 'MLB', 'NHL', 'Random team'],
      index: true,
      required: true
    },
    {
      name: 'seller',
      type: 'relationship',
      relationTo: 'user',
      required: true
    },
    {
      name: 'specialFeature',
      type: 'text',
      index: true,
      required: true
    },
    {
      name: 'brand',
      type: 'text',
      index: true,
      required: true
    },
    {
      name: 'gradeBy',
      type: 'text',
      index: true,
      required: true
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 10,
      index: true,
      required: true
    },
  ],
}

export default Product;