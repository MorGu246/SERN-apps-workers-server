module.exports = (req, res, next) => {
    const { tz } = req.body;

    if (!tz || tz.trim() === "") {
        return res.status(400).json({ 
            success: false, 
            message: 'חובה להזין תעודת זהות כדי לרשום יציאה.' 
        });
    }

    req.body.tz = tz.trim();
    const digitsOnly = /^\d+$/;
    if (!digitsOnly.test(req.body.tz) || req.body.tz.length > 9) {
        return res.status(400).json({
            success: false,
            message: 'תעודת זהות אינה תקינה. עליה להכיל ספרות בלבד ובאורך של עד 9 תווים.'
        });
    }
    next();
};