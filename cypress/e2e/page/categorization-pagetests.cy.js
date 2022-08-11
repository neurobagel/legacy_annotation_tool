describe("tests on categorization page via programmatic state loading and store interaction", () => {

    beforeEach(() => {

        // Standard app setup
        cy.appSetup();
    });

    // Categorization page tests with 'good' data files
    context("categorization page tests with good data", () => {

        beforeEach(() => {

            // Setup

            // 1. Open index page
            // NOTE: Home is visited because some state-related store structures
            // needed for the categorization page are set up on index page creation
            cy.visit("/");

            // 2. Load test data
            cy.loadTestDataIntoStore();

            // 3. Enable access to the categorization page
            cy.dispatchToNuxtStore("initializePage", {

                enable: true,
                pageName: "categorization"
            });

            // 4. Move to categorization page
            // NOTE: Routing to the page prevents the Vuex store from being wiped
            // when a page is 'visited' by Cypress
            cy.window().its("$nuxt.$router").then(router => {

                router.push({ path: "/categorization" });
            });
        });

        // Description of task: User selects one non-tool group category and paints one column
        // Expected results: Annotation nav and Next page button are enabled
        it("categorize data table column as 'Subject ID", () => {

            // Action 1

            // Select subject ID category
            cy.get("[data-cy='categorization-table']")
                .contains("Subject ID")
                .click();

            // Assert 1 - Nav and next button should not yet be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("have.class", "disabled");

            // Action 2

            // Link the first column in the column select table with the subject ID category
            cy.get("[data-cy='column-linking-table'] tbody tr td")
                .eq(1)
                .click();

            // Assert 2 - Nav and next button should be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("not.have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("not.have.class", "disabled");
        });

        // Description of task: User selects multiple non-tool group category and paints multiple columns
        // Expected results: Annotation nav and Next page button are enabled
        it("categorize one data table column as 'Subject ID' and another column as another category", () => {

            // Action 1

            // Select 'Subject ID' category
            cy.get("[data-cy='categorization-table']")
                .contains("Subject ID")
                .click();

            // Assert 1 - Nav and next button should not yet be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("have.class", "disabled");

            // Action 2

            // Link the first column in the column select table with the 'Subject ID' category
            cy.get("[data-cy='column-linking-table'] tbody tr td")
                .eq(1)
                .click();

            // Assert 2 - Nav and next button should be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("not.have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("not.have.class", "disabled");

            // Action 3

            // Select the next category
            cy.get("[data-cy='categorization-table'] tbody tr")
                .eq(2)
                .click();

            // Link the second column in the column select table with the 'Diagnosis' category
            cy.get("[data-cy='column-linking-table'] tbody tr td")
                .eq(2)
                .click();

            // Assert 3 - Nav and next button should *still* be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("not.have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("not.have.class", "disabled");
        });

        // Description of task: User selects the tool group category and paints one column,
        // writes name of tool group, groups that column into that tool group by clicking column name and add
        // Expected results: Annotation nav and Next page button remain disabled
        it("categorize another data table column as 'Assessment tool' and create a toolgroup for it", () => {

            // Action 1

            // Select 'Assessment Tool' category
            cy.get("[data-cy='categorization-table']")
                .contains("Assessment Tool")
                .click();

            // Assert 1 - Nav and next button should not yet be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("have.class", "disabled");

            // Action 2

            // Link the second column in the column select table with the 'Assessment Tool' category
            cy.get("[data-cy='column-linking-table'] tbody tr td")
                .eq(1)
                .click();

            // Assert 2 - Nav and next button should not be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("have.class", "disabled");

            // Action 3

            // Fill in the toolgroup name textbox
            cy.get("[data-cy='toolgroup-name-textbox']")
                .type("Test ToolGroup 1");

            // Select the column in the assessment tool column multi-selectbox
            cy.get("[data-cy='toolgroup-column-multiselect']")
                .select(0);

            // Create the tool group by clicking the 'create' button
            cy.get("[data-cy='create-toolgroup-button']")
                .click();

            // Assert 3 - Toolgroup is present in the tool groups table
            cy.get("[data-cy='toolgroup-table'] tbody")
                .children()
                .should("have.length", 1);

            // Assert 4 - Nav and next button should still be disabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("have.class", "disabled");
        });

        // Description of task: User selects non- and tool group categories, paints column with tool group paint,
        // creates tool group label, groups columns, paints columns with non-tool group categories
        // Expected results: Annotation nav and Next page button are enabled
        it("categorize data table column as 'Subject ID'" + "AND" +
           "categorize another data table column as 'Assessment tool' and create a toolgroup for it", () => {

            // Action 1

            // Select 'Assessment Tool' category
            cy.get("[data-cy='categorization-table']")
                .contains("Assessment Tool")
                .click();

            // Assert 1 - Nav and next button should not yet be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("have.class", "disabled");

            // Action 2

            // Link the second column in the column select table with the 'Assessment Tool' category
            cy.get("[data-cy='column-linking-table'] tbody tr td")
                .eq(1)
                .click();

            // Assert 2 - Nav and next button should not be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("have.class", "disabled");

            // Action 3

            // Fill in the toolgroup name textbox
            cy.get("[data-cy='toolgroup-name-textbox']")
                .type("Test ToolGroup 1");

            // Select the column in the assessment tool column multi-selectbox
            cy.get("[data-cy='toolgroup-column-multiselect']")
                .select(0);

            // Create the tool group by clicking the 'create' button
            cy.get("[data-cy='create-toolgroup-button']")
                .click();

            // Select subject ID category
            cy.get("[data-cy='categorization-table']")
                .contains("Subject ID")
                .click();

            // Link the second column in the column select table with the 'Subject ID' category
            cy.get("[data-cy='column-linking-table'] tbody tr td")
                .eq(2)
                .click();

            // Assert 3 - Nav and next button should now be enabled
            cy.get("[data-cy='menu-item-annotation'] a")
                .should("not.have.class", "disabled");
            cy.get("[data-cy='button-nextpage']")
                .should("not.have.class", "disabled");

            // Assert 4 - Toolgroup is present in the tool groups table
            cy.get("[data-cy='toolgroup-table'] tbody")
                .children()
                .should("have.length", 1);
        });
    });
});