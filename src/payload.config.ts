import { buildConfig } from 'payload/config';
import path from 'path';

import {User, Product, FavouriteProduct, Bidding, LiveBreak} from './collections';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: User.slug,
  },
  collections: [
    User,
    Product,
    FavouriteProduct,
    Bidding,
    LiveBreak,
    {
      slug: 'media',
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
      upload: true,
    },
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
