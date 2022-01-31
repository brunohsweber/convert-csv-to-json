import csvParse from "csv-parse";
import fs from "fs";

class ImportCSVUseCase {
  loadCSV(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const csv = [];

      const parseFile = csvParse({
        delimiter: ";",
        bom: true,
        columns: true,
        encoding: "utf8",
        ignore_last_delimiters: true,
        relax_column_count: true
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async line => {
          // ["coluna1", "coluna2"]
          // const [coluna1, coluna2] = line;

          csv.push({ ...line });
        })
        .on("end", () => {
          // const originalNameWithoutExtension = file.originalname.split(".csv")[0];

          const filenameJSON = `${file.filename}.json`;

          fs.writeFileSync(
            `${file.destination}/${filenameJSON}`,
            JSON.stringify(csv)
          );

          console.log(process.env.API_URL);

          const linkFileJSON = process.env.API_URL;

          fs.promises.unlink(file.path);

          // resolve(csv);

          resolve(linkFileJSON);
        })
        .on("error", err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<any> {
    const linkFileConverted = await this.loadCSV(file);

    return linkFileConverted;
  }
}

export { ImportCSVUseCase };
