const { Router } = require("express");
const {signup, singin, myevents, updateEvent, getallevents, deleteevent}= require("../controller/authcontroller");
const { isAuthenticated } = require("../middleware/auth");

const router = Router();

router.post("/signup",signup);
router.post("/signin",singin);
router.post("/create-events",myevents)
router.put("/event/:id",updateEvent)
router.get("/getevent",getallevents)
router.delete("/delete/:id",deleteevent)

module.exports=router