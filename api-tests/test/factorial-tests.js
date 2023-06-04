import supertest from "supertest";
import { expect } from "chai";
import { parseCSV } from "../helpers/csvParser.js";

const request = supertest("http://qainterview.pythonanywhere.com/");
const csvFilePath = "./files/test-cases.csv";

describe("Factorial tests", () => {
  let testCases = parseCSV(csvFilePath);

  testCases.forEach((testCase) => {
    const { Description, Number, Result, StatusCode } = testCase;

    it(`POST /factorial - ${Description}`, () => {
      return request
        .post("factorial")
        .field("number", Number)
        .then((res) => {
          if (Result === "Error") {
            expect(res.status).to.eql(parseInt(StatusCode));
            expect(res.body).to.have.property("error");
          } else if (Result === "Infinity") {
            expect(res.status).to.eql(parseInt(StatusCode));
            expect(res.body.answer.toString()).to.eql(Result);
          } else {
            expect(res.status).to.eql(parseInt(StatusCode));
            expect(res.body.answer).to.eql(parseInt(Result));
          }
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});