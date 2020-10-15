const router = require("express").Router();
const Meet = require("../model/MeetingModel");

router.post("/create", async (req, res) => {
  var meet = new Meet({
    meeting_id: req.body.meeting_id,
    title: req.body.title,
    date: req.body.date,
    organiser: req.body.organiser,
  });

  try {
    const data = await meet.save();
    res.json({ data: data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({
      message: "Empty field!",
    });
  }
  try {
    console.log("ID : ", req.params.id);
    Meet.findByIdAndUpdate(id, req.body).then(res.send({ message: "Updated" }));
  } catch (error) {
    res.status(400).json({ message: "Error updating, check fields." });
  }
});

router.get("/get", async (req, res) => {
  Meet.find()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Not found!" });
    });
});

router.get("/get/:id", async (req, res) => {
  Meet.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Error, Check id!" });
    });
});

module.exports = router;
