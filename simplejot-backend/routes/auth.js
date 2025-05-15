const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    obj={
        a: "This is",
        number: 34,
        third:"third item"
    }
    res.json(obj)
}); 

module.exports = router;
