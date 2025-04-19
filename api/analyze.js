export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method is allowed" });
  }

  try {
    const text = req.body;
    const lines = text.split("\n");

    const списания = [];
    const опоздания = [];

    const keywordsСписания = ["списал", "списание", "служебка", "стафф", "персонал", "служебное питание"];
    const keywordsОпоздания = ["опоздал", "опоздание"];

    lines.forEach((line) => {
      const lower = line.toLowerCase();

      if (keywordsСписания.some(word => lower.includes(word))) {
        списания.push(line);
      }

      if (keywordsОпоздания.some(word => lower.includes(word))) {
        опоздания.push(line);
      }
    });

    res.status(200).json({ списания, опоздания });
  } catch (error) {
    res.status(500).json({ error: "Что-то пошло не так", details: error.message });
  }
}
