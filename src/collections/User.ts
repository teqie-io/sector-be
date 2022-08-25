import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminOrCreatedBy } from '../permissions';

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
        update: isAdminOrCreatedBy,
        delete: isAdminOrCreatedBy
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
            name: 'role',
            type: 'select',
            access: {
                update: isAdmin
            },
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' }
            ],
            required: true,
            defaultValue: 'user'
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
