import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { newTask,myTasks,updateTasks,deleteTasks } from "../controllers/tasks.js";

const router= express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/myTasks",isAuthenticated,myTasks);
router.put("/:id",isAuthenticated,updateTasks);
router.delete("/:id",isAuthenticated,deleteTasks);

export default router;