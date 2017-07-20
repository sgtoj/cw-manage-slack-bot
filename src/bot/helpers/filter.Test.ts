import * as chai from "chai";
import * as td from "testdouble";

import { extractCWManageTicketNumber } from "./filter";

const assert = chai.assert;

describe("Functions", async () => {

    describe("extractCWManageTicketNumber()", async () => {

        it("should return null", async () => {
            const msg = `Hi Bob!`;

            const keys = extractCWManageTicketNumber(msg);

            assert.notOk(keys);
        });

        it("should return valid CW ticket number", async () => {
            const cwTicketNumber = "1234567";
            const msg = `Bob, you send #${cwTicketNumber} yet?`;

            const keys = extractCWManageTicketNumber(msg);

            assert.ok(keys);
            assert.isArray(keys);
            assert.equal(keys[0], cwTicketNumber);
        });

    });

});