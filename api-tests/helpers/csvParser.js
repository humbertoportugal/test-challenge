import fs from "fs";

export function parseCSV(csvFilePath) {
  const csvData = fs.readFileSync(csvFilePath, "utf-8");
  const rows = csvData.split("\n");

  // Remove header row
  const header = rows.shift().split(",");

  // Parse each row and create test case objects
  const testCases = rows.map((row) => {
    const values = row.split(",");
    const testCase = {};

    header.forEach((key, index) => {
      testCase[key.trim()] = values[index].trim();
    });

    return testCase;
  });

  return testCases;
}
