// assets
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

// icons
const icons = {
    ConfirmationNumberOutlinedIcon,
    EmailOutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const requests = {
    id: 'group-requetsts',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'requests',
            title: 'Requests',
            type: 'item',
            url: '/requests',
            icon: icons.ConfirmationNumberOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'templates',
            title: 'Templates',
            type: 'item',
            url: '/templates',
            icon: icons.EmailOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default requests;
