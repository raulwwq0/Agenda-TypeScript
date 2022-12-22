import { Router } from "express";
import contactController from "../controllers/contact.controller";

const router = Router();

router.get("/", (_, res) => {
    contactController.findAll().then((contacts) => {
        console.log(contacts);
        res.send(contacts);
    });
});

router.post("/", (req, res) => {
    contactController.save(req.body).then((contact) => {
        res.send(contact);
    });
});

export default router;
