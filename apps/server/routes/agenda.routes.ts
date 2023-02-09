import { Router } from "express";
import { AgendaController } from "../controllers/agenda.controller";

export class AgendaRouter {
    private readonly _router: Router = Router();

    public get router(): Router {
        return this._router;
    }

    constructor(private readonly contactController: AgendaController) {
        this._router.get("/", (_, res) => {
            this.contactController.findAll()
                .then((contacts) => {
                    res.send(contacts);
                }).catch((error: Error) => {
                    res.send(error);
                });
        });
        this._router.post("/", (req, res) => {
            this.contactController.save(req.body)
                .then((contact) => {
                    res.send(contact);
                }).catch((error: Error) => {
                    res.send(error);
                });
        });
        this._router.delete("/:id", (req, res) => {
            this.contactController.delete(req.params.id)
                .then(() => {
                    res.send();
                }).catch((error: Error) => {
                    res.send(error);
                });
        });
        this._router.put(["/", "/:id"], (req, res) => {
            this.contactController.update(req.body)
                .then((contact) => {
                    res.send(contact);
                }).catch((error: Error) => {
                    res.send(error);
                });
        });
    }
}