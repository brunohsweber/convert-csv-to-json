import { Router } from "express";
import multer from "multer";

import { ImportCSVController } from "@modules/convert/useCases/importCSV/ImportCSVController";

const convertRoutes = Router();

const importCSVController = new ImportCSVController();

const upload = multer({
  dest: "./tmp"
});

convertRoutes.post(
  "/csv-to-json",
  upload.single("file"),
  importCSVController.handle
);

export { convertRoutes };
