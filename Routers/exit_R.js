const express = require('express');
const router = express.Router();

const exit_Mid = require('../Middleware/exit_Mid');

// נתיב לרישום יציאה מהעבודה: POST http://localhost:6128/api/EXT
router.post('/', exit_Mid, (req, res) => {
    const { tz } = req.body;
    // 1. בדיקה בסיסית ששדה תעודת הזהות אכן הגיע
    // if (!tz || tz.trim() === "") {
    //     return res.status(400).json({ 
    //         success: false, 
    //         message: 'חובה להזין תעודת זהות חוקית.' 
    //     });
    // }
    // 2. שאילתת SQL עבור יציאה
    const sqlQuery = "INSERT INTO `entrances_and_exits` (`tz`, `action_type`) VALUES (?, 'check_out')";
    // 3. הרצת השאילתה
    global.db_pool.execute(sqlQuery, [tz], (err, results) => {
        if (err) {
            console.error("שגיאה ברישום יציאה בבסיס הנתונים:", err);
            return res.status(500).json({ 
                success: false, 
                message: 'שגיאת שרת פנימית, הרישום נכשל.' 
            });
        }
        // 4. החזרת תשובה חיובית ל-Frontend
        return res.status(200).json({
            success: true,
            message: 'היציאה נרשמה בהצלחה! נסיעה טובה הביתה.',
            id: results.insertId
        });
    });
});

module.exports = router;