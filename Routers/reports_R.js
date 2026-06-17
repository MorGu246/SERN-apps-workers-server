const express = require('express');
const router = express.Router();

// נתיב לקבלת דוח נוכחות: GET http://localhost:6128/api/REP
router.get('/', (req, res) => {
    // שליפת הפרמטרים מתוך כתובת ה-URL (למשל: ?tz=123456789&month=6&year=2026)
    const { tz, month, year } = req.query;

    // 1. בדיקה שכל הפרמטרים הדרושים הגיעו
    if (!tz || !month || !year) {
        return res.status(400).json({ 
            success: false, 
            message: 'חובה לספק תעודת זהות, חודש ושנה עבור הדוח.' 
        });
    }

    // 2. שאילתת SQL חכמה: משתמשים ב-MONTH() וב-YEAR() כדי לחתוך את התאריך מהלוג
    const sqlQuery = `
        SELECT id, action_type, log_time 
        FROM entrances_and_exits 
        WHERE tz = ? 
          AND MONTH(log_time) = ? 
          AND YEAR(log_time) = ?
        ORDER BY log_time ASC
    `;

    // 3. הרצת השאילתה עם שלושת הפרמטרים בסדר המתאים
    global.db_pool.execute(sqlQuery, [tz, month, year], (err, results) => {
        if (err) {
            console.error("שגיאה בשליפת דוח מהדאטהבייס:", err);
            return res.status(500).json({ 
                success: false, 
                message: 'שגיאת שרת פנימית, שליפת הדוח נכשלה.' 
            });
        }

        // 4. החזרת מערך השורות שנמצאו ישירות ל-Frontend
        return res.status(200).json({
            success: true,
            data: results // כאן יחזרו כל הכניסות והיציאות של אותו עובד
        });
    });
});

module.exports = router;