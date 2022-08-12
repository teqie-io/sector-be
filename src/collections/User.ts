import { CollectionConfig } from 'payload/types';

const passport = require('passport');

const User: CollectionConfig = {
  slug: 'user',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true
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
    }
  ],
  endpoints: [
    {
      path: '/login',
      method: 'get',
      handler: async(req, res, next) => {
        // const loginType = req.body.loginType;
        // const auth = passport.authenticate(loginType, {
        //   scope: ['email'],
        //   state: req.query.role
        // });
        res.status(200).send("demo");
      }
    },
    // {
    //   path: 'signup',
    //   method: 'post',
    //   handler: async(req, res, next) => {
    //   }
    // },
    // {
    //   path: 'facebook/callback',
    //   method: 'get',
    //   handler: async(req, res, next) => {
    //
    //   }
    // },
    // {
    //   path: 'google/callback',
    //   method: 'get',
    //   handler: async(req, res, next) => {
    //
    //   }
    // },
  ]
};

export default User;