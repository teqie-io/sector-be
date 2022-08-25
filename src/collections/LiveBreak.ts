import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminOrCreatedBy } from '../permissions';

const LiveBreak: CollectionConfig = {
    slug: 'liveBreak',
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: () => true,
        update: isAdminOrCreatedBy,
        delete: isAdminOrCreatedBy
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
        {
            name: 'name',
            type: 'text',
            index: true,
            required: true
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
            required: true,
            defaultValue: 'Random team',
            index: true
        },
        {
            name: 'seller',
            type: 'relationship',
            relationTo: 'user',
            required: true
        },
        {
            name: 'brand',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'published',
            type: 'checkbox',
            access: {
                read: () => true,
                update: isAdmin
            },
            defaultValue: false,
            required: true
        },
        {
            name: 'createdBy',
            type: 'relationship',
            relationTo: 'user',
            access: {
                update: () => false
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
                condition: (data) => Boolean(data?.createdBy)
            }
        }
    ],
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
                if (operation === 'create') {
                    if (req.user) {
                        data.createdBy = req.user.id;
                        return data;
                    }
                }
            }
        ]
    }
};

export default LiveBreak;
