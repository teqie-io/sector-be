export const isAdminOrSeller = ({ req: { user } }) => {
    if (user && user.role === 'admin') {
        return true;
    }

    if (user) {
        return {
            seller: {
                equals: user.id
            }
        };
    }

    return false;
};

export const isAdmin = ({ req: { user } }) => {
    return user && user.role === 'admin';
};

export const isAdminOrMe = ({ req: { user } }) => {
    if (user && user.role === 'admin') {
        return true;
    }

    if (user) {
        return {
            id: {
                equals: user.id
            }
        };
    }

    return false;
};