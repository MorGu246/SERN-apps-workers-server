const express = require('express');
const router = express.Router();

const exit_Mid = require('../Middleware/exit_Mid');

// נתיב לרישום יציאה מהעבודה: POST http://localhost:6128/api/EXT
router.post('/', exit_Mid, (req, res) => {
    const { tz } = req.body;
    const sqlQuery = "INSERT INTO `entrances_and_exits` (`tz`, `action_type`) VALUES (?, 'check_out')";
    global.db_pool.execute(sqlQuery, [tz], (err, results) => {
        if (err) {
            console.error("שגיאה ברישום יציאה בבסיס הנתונים:", err);
            return res.status(500).json({ 
                success: false, 
                message: 'שגיאת שרת פנימית, הרישום נכשל.' 
            });
        }
        return res.status(200).json({
            success: true,
            message: 'היציאה נרשמה בהצלחה! נסיעה טובה הביתה.',
            id: results.insertId
        });
    });
});

module.exports = router;