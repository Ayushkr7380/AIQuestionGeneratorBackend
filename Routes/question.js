import {Router} from "express";
import { askquestion } from "../Controllers/AIQuestion/Ai.Question.Controller.js";

const route = Router();

route.post("/askquestion",askquestion);

export default route;