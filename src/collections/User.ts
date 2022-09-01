import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminOrMe } from '../permissions';

const User: CollectionConfig = {
    slug: 'user',
    auth: true,
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['firstName', 'lastName', 'email', 'role']
    },
    access: {
        create: () => true,
        read: () => true,
        update: isAdminOrMe,
        delete: isAdminOrMe
    },
    fields: [
        {
            name: 'firstName',
            type: 'text'
        },
        {
            name: 'lastName',
            type: 'text'
        },
        {
            name: 'googleId',
            type: 'text'
        },
        {
            name: 'facebookId',
            type: 'text'
        },
        {
            name: 'role',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' }
            ],
            required: true,
            access: {
                update: isAdmin
            },
            admin: {
                description: 'Set user role (default is User).',
                position: 'sidebar',
                condition: (data) => Boolean(data?.role)
            }
        }
    ],
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
                if (operation === 'create') {
                    data.role = 'user';
                    return data;
                }
            }
        ]
    }
};

export default User;
