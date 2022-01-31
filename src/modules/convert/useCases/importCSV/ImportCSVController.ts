import { Request, Response } from "express";
import { fstat } from "fs";

import { ImportCSVUseCase } from "./ImportCSVUseCase";

class ImportCSVController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCSVUseCase = new ImportCSVUseCase();

    const linkFileConverted = await importCSVUseCase.execute(file);

    return response.status(201).json({ linkFileConverted });
  }
}

export { ImportCSVController };
