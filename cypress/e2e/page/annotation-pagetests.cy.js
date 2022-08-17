describe("tests on annotation page ui with programmatic state loading and store interaction", () => {

    // List of datasets to use for these tests
    const datasets = [

        // Good data
        require("../../fixtures/tests/good-test-config.json")

        // NOTE: Add more dataset json files here via 'require'
    ];

    beforeEach(() => {

        // Standard app setup
        cy.appSetup();
    });

    datasets.forEach((p_dataset) => {

        context("annotation page tests with " + p_dataset.description + " data", () => {

            beforeEach(() => {

                // Setup

                // 1. Open index page
                // NOTE: Home is visited because some state-related store structures
                // needed for the categorization page are set up on index page creation
                cy.visit("/");

                // 2. Load test data
                cy.loadTestDataIntoStore(p_dataset);

                // 3. Programmatically link categories to columns here
                cy.setProgrammaticState("annotation", {

                    categoryColumnPairs: [

                        ["Subject ID", "participant_id"],
                        ["Age", "age"],
                        ["Sex", "sex"],
                        ["Diagnosis", "group"],
                        ["Assessment Tool", "iq"]
                    ]
                });

                // 4. Assessment tool linking and group creation here

                // 5. Move to the annotation page
                // NOTE: Routing to the page prevents the Vuex store from being wiped
                // when a page is 'visited' by Cypress
                cy.window().its("$nuxt.$router").then(router => {

                    router.push({ path: "/annotation" });
                });

            });

            it("simple age annotation", () => {

                // 1. Assert annotation nav and next page button are disabled
                cy.assertNextPageAccess("download", false);

                // 2. Annotate 'Age'-categorized columns

                // A. Click on the 'Age' tab
                cy.get("[data-cy='annotation-category-tabs'] ul")
                    .contains("li", "Age")
                    .click();

                // B. Click on the 'Save Annotation' button
                cy.get("button")
                    .contains("Save Annotation")
                    .click();

                // 1. Assert annotation nav and next page button are enabled
                cy.assertNextPageAccess("download", true);
            });

            // it("", () => {

            // });

            // it("", () => {

            // });

            // it("", () => {

            // });

            // it("", () => {

            // });
        });

    });

});