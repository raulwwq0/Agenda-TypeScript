import { Router } from "express";
import { AgendaController } from "../controllers/agenda.controller";

export class AgendaRouter {
    private readonly _router: Router = Router();

    public get router(): Router {
        return this._router;
    }

    constructor(private readonly agendaController: AgendaController) {
        this._router.get("/", (_, res) => {
            this.agendaController.findAll()
                .then((contacts) => {
                    res.send(contacts);
                }).catch((error: Error) => {
                    res.send(error);
                });
        });
        this._router.post("/", (req, res) => {
            this.agendaController.save(req.body)
                .then((contact) => {
                    res.send(contact);
                }).catch((error: Error) => {
                    res.send(error);
                });
        });
        this._router.delete("/:id", (req, res) => {
            this.agendaController.delete(req.params.id)
                .then(() => {
                    res.send();
                }).catch((error: Error) => {
                    res.send(error);
                });
        });
        this._router.put(["/", "/:id"], (req, res) => {
            this.agendaController.update(req.body)
                .then((contact) => {
                    res.send(contact);
                }).catch((error: Error) => {
                    res.send(error);
                });
        });
    }
}