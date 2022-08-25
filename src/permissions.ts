export const isAdminOrCreatedBy = ({ req: { user } }) => {
    if (user && user.role === 'admin') {
        return true;
    }

    if (user) {
        return {
            createdBy: {
                equals: user.id
            }
        };
    }

    return false;
};

export const isAdmin = ({ req: { user } }) => {
    return user && user.role === 'admin';
};
