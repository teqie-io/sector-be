import { CollectionConfig } from 'payload/types';
import {isAdmin, isAdminOrSeller, isAdminOrSellerOrPublished} from '../permissions';

const LiveBreak: CollectionConfig = {
    slug: 'liveBreak',
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: isAdminOrSellerOrPublished,
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
            type: 'number',
            min: 1900,
            max: new Date().getFullYear(),
            defaultValue: new Date().getFullYear(),
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
            type: 'array',
            fields: [
                {
                    name: 'teams',
                    type: 'select',
                    options: [
                        'Dallas Mavericks', 'Denver Nuggets', 'Golden State Warriors', 'Houston Rockets', 'Los Angeles Clippers',
                        'Los Angeles Lakers', 'Memphis Grizzlies', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'Oklahoma City Thunder',
                        'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Utah Jazz',
                        'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls',
                        'Cleveland Cavaliers', 'Detroit Pistons', 'Indiana Pacers', 'Miami Heat', 'Milwaukee Bucks',
                        'New York Knicks', 'Orlando Magic', 'Philadelphia 76ers', 'Toronto Raptors', 'Washington Wizards',
                    ],
                    required: true
                }
            ],
            required: true
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
                condition: (data) => Boolean(data?.published)
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
