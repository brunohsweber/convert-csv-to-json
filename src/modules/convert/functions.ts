import fs from "fs";
import path from "path";

const csvParse = require("csv-parse");

async function readPath(directory) {
  return new Promise((resolve, reject) => {
    try {
      let files = fs.readdirSync(directory);

      files = files.map(file => {
        return path.join(directory, file);
      });

      resolve(files);
    } catch (error) {
      reject(error);
    }
  });
}

async function filterFiles(array, endsWith) {
  return array.filter(obj => obj.endsWith(endsWith));
}

async function readFiles(files) {
  return Promise.all(files.map((file: string) => this.readFile(file)));
}

async function readFile(file) {
  if (file.endsWith(".csv")) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file);

      const fileObj = { file: path.basename(file), rows: [] };

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
        .on("data", async row => {
          const { ...rowObj } = JSON.parse(JSON.stringify(row).toLowerCase());

          fileObj.rows.push(rowObj);
        })
        .on("end", async () => {
          fs.promises.unlink(file);

          resolve(fileObj);
        })
        .on("error", err => {
          reject(err);
        });
    });
  }

  return file;
}

export { readPath, filterFiles, readFiles, readFile };
