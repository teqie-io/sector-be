import { buildConfig } from 'payload/config';
import path from 'path';

import {User, Card, FavouriteProduct, Bidding, LiveBreak} from './collections';

const serverURL = process.env.SERVER_URL

export default buildConfig({
  admin: {
    user: User.slug,
  },
  cors: '*',
  collections: [
    User,
    Card,
    FavouriteProduct,
    Bidding,
    LiveBreak,
    {
      slug: 'media',
      access: {
        read: () => true,
      },
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
