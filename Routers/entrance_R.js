const express = require('express');
const router = express.Router();

const entrance_Mid = require('../Middleware/entrance_Mid');

// נתיב לרישום כניסה לעבודה: POST http://localhost:6128/api/ENT
router.post('/', entrance_Mid, (req, res) => {
    const { tz } = req.body;
    // 1. בדיקה בסיסית ששדה תעודת הזהות אכן הגיע
    // if (!tz || tz.trim() === "") {
    //     return res.status(400).json({ 
    //         success: false, 
    //         message: 'חובה להזין תעודת זהות חוקית.' 
    //     });
    // }
    // 2. שאילתת SQL - שים לב שאנחנו לא מכניסים את log_time כי הוא נוצר אוטומטית בדיאטבייס!
    const sqlQuery = "INSERT INTO `entrances_and_exits` (`tz`, `action_type`) VALUES (?, 'check_in')";
    // 3. הרצת השאילתה באמצעות ה-Pool הגלובלי שהגדרת
    global.db_pool.execute(sqlQuery, [tz], (err, results) => {
        if (err) {
            console.error("שגיאה ברישום כניסה בבסיס הנתונים:", err);
            return res.status(500).json({ 
                success: false, 
                message: 'שגיאת שרת פנימית, הרישום נכשל.' 
            });
        }
        // 4. החזרת תשובה חיובית ל-Frontend
        return res.status(200).json({
            success: true,
            message: 'הכניסה נרשמה בהצלחה! המשך יום עבודה נעים.',
            id: results.insertId
        });
    });
});

module.exports = router;