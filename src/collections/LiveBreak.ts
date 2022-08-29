import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminOrSeller } from '../permissions';

const LiveBreak: CollectionConfig = {
    slug: 'liveBreak',
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: () => true,
        update: isAdminOrSeller,
        delete: isAdminOrSeller
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
            name: 'brand',
            type: 'text',
            index: true,
            required: true
        },
        {
            name: 'seller',
            type: 'relationship',
            relationTo: 'user',
            access: {
                read: () => true
            },
            admin: {
                readOnly: true,
                position: 'sidebar',
                condition: (data) => Boolean(data?.seller)
            }
        },
        {
            name: 'published',
            type: 'checkbox',
            access: {
                read: () => true,
                update: isAdmin
            },
            admin: {
                position: 'sidebar',
                condition: (data) => Boolean(data?.seller)
            }
        }
    ],
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
                if (operation === 'create') {
                    if (req.user) {
                        data.seller = req.user.id;
                        data.published = false;
                        return data;
                    }
                }
            }
        ]
    }
};

export default LiveBreak;
