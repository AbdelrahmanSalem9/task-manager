const allowedFields = ['priority', 'createdAt', 'dueDate', 'status'];

const sortingMiddleware = (req, res, next) => {
    const { sort } = req.query;

    // Default sorting by createdAt in descending order
    if (!sort) {
        req.sort = { createdAt: -1 };
        return next();
    }

    // Parse and validate sort criteria
    const sortCriteria = sort.split(',').reduce((acc, field) => {
        const [key, order] = field.split(':').map(s => s.trim());

        // Validate and build sorting object only for allowed fields
        if (allowedFields.includes(key) && (order === 'asc' || order === 'desc')) {
            acc[key] = order === 'asc' ? 1 : -1;
        } else if (key) {
            // Handle invalid field or order
            return res.status(400).json({
                error: `Invalid sort field or order: ${field}. Allowed fields: ${allowedFields.join(', ')}.`
            });
        }

        return acc;
    }, {});

    // If no valid sort criteria found, fall back to default sorting
    if (Object.keys(sortCriteria).length === 0) {
        req.sort = { createdAt: -1 };
    } else {
        req.sort = sortCriteria;
    }

    next();
};

module.exports = sortingMiddleware;
