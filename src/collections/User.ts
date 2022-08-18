import { CollectionConfig } from 'payload/types';

const User: CollectionConfig = {
  slug: 'user',
  auth: true,
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'fullName', 'role']
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
    },
    {
      name: 'fullName',
      type: 'text'
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
    {
      name: 'googleId',
      type: 'text'
    },
    {
      name: 'facebookId',
      type: 'text'
    }
  ]
};

export default User;