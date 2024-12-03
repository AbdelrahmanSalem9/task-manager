const allowedFilters = ['status', 'priority', 'dueDate', 'createdAt'];

const filteringMiddleware = (req, res, next) => {
    const { filter } = req.query;

    // If no filter is provided, proceed with an empty filter object
    if (!filter) {
        req.filter = {};
        return next();
    }

    // Parse the filter query string
    const filterCriteria = filter.split(',').reduce((acc, field) => {
        const [key, value] = field.split(':').map(s => s.trim());

        // Check if the field is an allowed filter
        if (allowedFilters.includes(key)) {
            // If the value can be converted to a number, do so; otherwise, leave it as a string
            acc[key] = isNaN(value) ? value : Number(value);
        } else if (key) {
            // Handle invalid filter fields
            return res.status(400).json({
                error: `Invalid filter field: '${key}'. Allowed filters are: ${allowedFilters.join(', ')}.`
            });
        }

        return acc;
    }, {});

    req.filter = filterCriteria;
    next();
};

module.exports = filteringMiddleware;
