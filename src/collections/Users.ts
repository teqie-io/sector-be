import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
  endpoints: [
    {
      path: 'login',
      method: 'post',
      handler: async(req, res, next) => {
        const loginType = req.body.loginType;
        const auth = passport.authenticate(loginType, {
          scope: ['email'],
          state: req.query.role
        });
      }
    },
    {
      path: 'signup',
      method: 'post',
      handler: async(req, res, next) => {
      }
    },
    {
      path: 'facebook/callback',
      method: 'get',
      handler: async(req, res, next) => {

      }
    },
    {
      path: 'google/callback',
      method: 'get',
      handler: async(req, res, next) => {

      }
    },
  ]
};

export default Users;