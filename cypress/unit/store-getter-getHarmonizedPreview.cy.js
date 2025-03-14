import { getters } from "~/store";

let store;
let originalValue;

describe("getHarmonizedPreview", () => {

    beforeEach(() => {

        store = {

            state: {

                appSetting: {

                    missingValueLabel: "missing value"
                },

                dataDictionary: {

                    annotated: {

                        column1: {

                            transformationHeuristic: ""
                        }
                    }
                }

            }
        };
    });

    it("float transformation", () => {

        // Setup
        store.state.dataDictionary.annotated.column1.transformationHeuristic = "float";
        originalValue = "42.6";

        // Act
        const harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

        // Assert
        expect(Number.isInteger(harmonizedValue)).to.be.false;
        expect(harmonizedValue).to.equal(42.6);
    });

    it("bounded transformation", () => {

        // Setup
        store.state.dataDictionary.annotated.column1.transformationHeuristic = "bounded";


        // 1. Positive integer with "+" prepended

        // Setup
        originalValue = "+42";

        // Act
        let harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

        // Assert
        expect(harmonizedValue).to.equal(42);

        // 2. Regular integer

        // Setup
        originalValue = "42";

        // Act
        harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

        // Assert
        expect(harmonizedValue).to.equal(42);


        // 3. Negative integer

        // Setup
        originalValue = "-42";

        // Act
        harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

        // Assert
        expect(harmonizedValue).to.equal(-42);

        // 4. Float value truncated

        // Setup
        originalValue = "42.6";

        // Act
        harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

        // Assert
        expect(harmonizedValue).to.equal(42);
    });

    it("euro transformation", () => {

        // Setup
        store.state.dataDictionary.annotated.column1.transformationHeuristic = "euro";
        originalValue = "42,6";

        // Act
        const harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

        // Assert
        expect(Number.isInteger(harmonizedValue)).to.be.false;
        expect(harmonizedValue).to.equal(42.6);
    });

    it("int transformation", () => {

        // Setup
        store.state.dataDictionary.annotated.column1.transformationHeuristic = "int";
        originalValue = "42.6";

        // Act
        const harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

        // Assert
        expect(harmonizedValue).to.equal(42);
    });

    it("range transformation", () => {

        // Setup
        store.state.dataDictionary.annotated.column1.transformationHeuristic = "range";
        originalValue = "40.5-50.5";

        // Act
        const harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

        // Assert
        expect(harmonizedValue).to.equal(45.5);
    });

    // it("isoyear transformation", () => {

    //     // Setup
    //     store.state.dataDictionary.annotated.column1.transformationHeuristic = "isoyear";
    //     originalValue = "22Y10M";

    //     // Act
    //     const harmonizedValue = getters.getHarmonizedPreview(store.state)("column1", originalValue);

    //     // Assert
    //     expect(harmonizedValue).to.equal(32);
    // });
});