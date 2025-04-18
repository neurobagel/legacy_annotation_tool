import annotMissingValues from "~/components/annot-missing-values";


// Mocked Store getters
const store = {

    getters: {

        getMissingValues: () => (p_category) => {

            return {

                column1: ["val1", "val2"],
                column2: ["val3"]
            };
        },
        getValueDescription: () => (p_column, p_missingValue) => p_missingValue + " from " + p_column
    }
};

const props = {

    activeCategory: "category1"
};

describe("Missing values", () => {

        it("Displays unique values and description", () => {

                // Act
                cy.mount(annotMissingValues, {

                        propsData: props,
                        computed: store.getters
                    }
                );

                // Assert
                cy.get(".missing-values-card-body").contains("val1 from column1");
            }
        );

        it("Handles lack of description gracefully", () => {

                // Act
                cy.mount(annotMissingValues, {

                        propsData: props,
                        computed: store.getters
                    }
                );
            }
        );

        it("Can be declared 'not missing' by clicking the 'Not Missing' button", () => {

                // Setup
                const mockStore = { commit: () => {} };
                cy.spy(mockStore, "commit").as("commitSpy");
                cy.mount(annotMissingValues, {

                    computed: store.getters,
                    mocks: { $store: mockStore },
                    propsData: props
                });

                // Act
                cy.get("[data-cy='toggle-collapse-button']").click();
                cy.get("[data-cy='not-missing-button-column1-val1']").click();

                // Assert
                cy.get("@commitSpy").should("have.been.calledWith", "changeMissingStatus", { column: "column1", value: "val1", markAsMissing: false });
            }
        );
    }
);
