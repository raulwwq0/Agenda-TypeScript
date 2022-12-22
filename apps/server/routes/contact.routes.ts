import { Router } from "express";
import contactController from "../controllers/contact.controller";

const router = Router();

router.get("/", (_, res) => {
    contactController.findAll().then((contacts) => {
        res.send(contacts);
    });
});

router.post("/", (req, res) => {
    contactController.save(req.body).then((contact) => {
        res.send(contact);
    });
});

router.delete("/:id", (req, res) => {
    contactController.delete(req.params.id).then(() => {
        res.send();
    });
});

router.put("/", (req, res) => {
    contactController.update(req.body).then((contact) => {
        res.send(contact);
    });
});

export default router;
