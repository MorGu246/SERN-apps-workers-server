const express = require('express');
const router = express.Router();

// נתיב לקבלת דוח נוכחות: GET http://localhost:6128/api/REP
router.get('/', (req, res) => {
    const { tz, month, year } = req.query;

    if (!tz || !month || !year) {
        return res.status(400).json({ 
            success: false, 
            message: 'חובה לספק תעודת זהות, חודש ושנה עבור הדוח.' 
        });
    }

    const sqlQuery = `
        SELECT id, action_type, log_time 
        FROM entrances_and_exits 
        WHERE tz = ? 
          AND MONTH(log_time) = ? 
          AND YEAR(log_time) = ?
        ORDER BY log_time ASC
    `;

    global.db_pool.execute(sqlQuery, [tz, month, year], (err, results) => {
        if (err) {
            console.error("שגיאה בשליפת דוח מהדאטהבייס:", err);
            return res.status(500).json({ 
                success: false, 
                message: 'שגיאת שרת פנימית, שליפת הדוח נכשלה.' 
            });
        }

        return res.status(200).json({
            success: true,
            data: results
        });
    });
});

module.exports = router;