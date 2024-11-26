const allowedFilters = ['status', 'priority', 'dueDate', 'createdAt'];

const filteringMiddleware = (req, res, next) => {
    const { filter } = req.query;

    if (!filter) {
        req.filter = {};
        return next();
    }

    const filterCriteria = filter.split(',').reduce((acc, field) => {
        const [key, value] = field.split(':');
        if (allowedFilters.includes(key.trim())) {
            acc[key.trim()] = isNaN(value) ? value.trim() : Number(value.trim());
        }
        return acc;
    }, {});

    req.filter = filterCriteria;
    next();
};

module.exports = filteringMiddleware
