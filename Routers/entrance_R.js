const express = require('express');
const router = express.Router();

const entrance_Mid = require('../Middleware/entrance_Mid');

// נתיב לרישום כניסה לעבודה: POST http://localhost:6128/api/ENT
router.post('/', entrance_Mid, (req, res) => {
    const { tz } = req.body;
    const sqlQuery = "INSERT INTO `entrances_and_exits` (`tz`, `action_type`) VALUES (?, 'check_in')";
    global.db_pool.execute(sqlQuery, [tz], (err, results) => {
        if (err) {
            console.error("שגיאה ברישום כניסה בבסיס הנתונים:", err);
            return res.status(500).json({ 
                success: false, 
                message: 'שגיאת שרת פנימית, הרישום נכשל.' 
            });
        }
        return res.status(200).json({
            success: true,
            message: 'הכניסה נרשמה בהצלחה! המשך יום עבודה נעים.',
            id: results.insertId
        });
    });
});

module.exports = router;