
const myController = (upInstance) => {
  upInstance.registerController('mycontroller.mymethod', (req, res) => {
    console.info(req.swagger);
    res.json({ ok: true });
  });
};

module.exports = myController;
