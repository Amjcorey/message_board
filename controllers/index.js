const router = require('express').Router();

const homeroutes = require('./homeroutes');
const apiroutes = require('./api');

router.use('/', homeroutes);
router.use('/api', apiroutes);



// log 404 when a route is not found
router.use((req, res) => {
  res.send('<h1>404!!!</h1>');
});


module.exports = router;