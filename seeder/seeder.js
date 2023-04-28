import { connetedDb } from "../config/db.js";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";

import Students from "../models/product.model.js";

dotenv.config();

connetedDb();

const __dirname = path.resolve();

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, `/seeder/data/students.json`))
);

const importData = async () => {
  try {
    await Students.create(data);
    console.log("import was successful");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Students.deleteMany();
    console.log("delete was successful");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") deleteData();
