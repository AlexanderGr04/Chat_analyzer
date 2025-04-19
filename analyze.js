export const config = {
  api: {
    bodyParser: false,
  },
};

import formidable from 'formidable';
import fs from 'fs';

const keywords = ["списал", "списание", "персонал", "служебка", "служебное питание", "стафф"];
const delayKeywords = ["опоздал", "опоздание"];

export default async function handler(req, res) {
  const form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).send("Ошибка обработки файла");
      return;
    }
    const chatText = fs.readFileSync(files.file[0].filepath, "utf8");
    const lines = chatText.split("\n");

    const result = [];
    for (const line of lines) {
      const lower = line.toLowerCase();
      if (keywords.some(k => lower.includes(k)) || delayKeywords.some(k => lower.includes(k))) {
        result.push(line);
      }
    }

    res.status(200).send(result.join("\n"));
  });
}
