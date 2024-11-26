const allowedFields = ['priority', 'createdAt', 'dueDate', 'status'];

const sortingMiddleware = (req, res, next) => {
    const { sort } = req.query;

    if (!sort) {
        req.sort = { createdAt: -1 }; // Default sorting
        return next();
    }

    const sortCriteria = sort.split(',').reduce((acc, field) => {
        const [key, order] = field.split(':');
        if (allowedFields.includes(key.trim())) {
            acc[key.trim()] = order === 'asc' ? 1 : -1;
        }
        return acc;
    }, {});

    req.sort = sortCriteria;
    next();
};

module.exports = sortingMiddleware;
