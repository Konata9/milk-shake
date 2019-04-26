import milkShake from "../src/index";
import {expect} from "chai";
import "mocha";

const {snakeToCamel} = milkShake;

describe("snakeToCamel", () => {
  it("transfrom snake string to camel string", () =>
    expect(snakeToCamel("user_name")).to.be.equal("userName"));
});
