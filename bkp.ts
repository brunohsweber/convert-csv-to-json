import fs from "fs";
import { json2csv } from "json-2-csv";
import { CreateFakeData } from "utils/createFakeData";

import { filterFiles, readFiles, readPath } from "@utils/functions";

(async () => {
  const createFakeData = new CreateFakeData();

  const filesToCreateCSV = [
    {
      filename: "person.csv",
      data: createFakeData.person()
    },
    {
      filename: "products.csv",
      data: createFakeData.products()
    },
    {
      filename: "vehicles.csv",
      data: createFakeData.vehicles()
    }
  ];

  filesToCreateCSV.forEach(file => {
    json2csv(
      file.data,
      (err, csv) => {
        if (err) throw err;

        fs.writeFileSync(`src/temp/csv/${file.filename}`, csv);
      },
      { delimiter: { field: ";" } }
    );
  });

  const filesMapped = await readPath("src/temp/csv");

  const filesFiltered = await filterFiles(filesMapped, ".csv");

  if (!filesFiltered.length) {
    throw new Error("Nenhum arquivo CSV na pasta");
  }

  const filesRead = await readFiles(filesFiltered);

  console.log(filesRead);
})();
