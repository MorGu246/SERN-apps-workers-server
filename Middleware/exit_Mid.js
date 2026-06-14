module.exports = (req, res, next) => {
    const { tz } = req.body;
    // 1. בדיקה ראשונית ששדה תעודת הזהות קיים ולא ריק
    if (!tz || tz.trim() === "") {
        return res.status(400).json({ 
            success: false, 
            message: 'חובה להזין תעודת זהות כדי לרשום יציאה.' 
        });
    }
    // 2. ניקוי רווחים ושמירת הערך הנקי בחזרה בתוך הבקשה
    req.body.tz = tz.trim();
    // 3. בדיקה שתעודת הזהות מכילה רק ספרות ושהאורך לא עולה על 9 תווים
    const digitsOnly = /^\d+$/;
    if (!digitsOnly.test(req.body.tz) || req.body.tz.length > 9) {
        return res.status(400).json({
            success: false,
            message: 'תעודת זהות אינה תקינה. עליה להכיל ספרות בלבד ובאורך של עד 9 תווים.'
        });
    }
    // אם הכל תקין, המידלוור מעביר את השליטה לראוטר הבא בתור
    next();
};