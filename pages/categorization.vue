<template>

    <b-container fluid>

        <!-- Column-categorization linking -->
        <b-row>

            <!-- Category selection table -->
            <b-col cols="4">

                <!-- Heading for category select component -->
                <b-row>
                    <h3>{{ uiText.categorySelectTitle }}</h3>
                </b-row>

                <!-- Instructions prompting the user how to link categories and columns -->
                <b-row>
                    <p class="instructions-text">
                        {{ uiText.categorySelectInstructions }}
                    </p>
                </b-row>

                <category-select-table
                    data-cy="categorization-table"
                    :selected-category="selectedCategory"
                    @category-select="setSelectedCategory($event.category)" />
            </b-col>

            <!-- Category to column linking table -->
            <b-col cols="8">
                <column-linking-table
                    data-cy="column-linking-table"
                    :selected-category="selectedCategory" />
            </b-col>

        </b-row>
        <b-row>
            <b-row>
                <p class="instructions-text" v-html="uiText.assessmentInstructions" />
            </b-row>
        </b-row>

        <categoryToolgroup />

    </b-container>

</template>

<script>

    // Methods listed in mapGetters below can be found in the store (index.js)
    import { mapGetters } from "vuex";

    export default {
        name: "CategorizationPage",
        data() {
            return {
                // Category selection (default is index 0, no selection is -1)
                selectedCategory: "",
                // Text for UI elements
                uiText: {
                    categorySelectInstructions: "Click category and then corresponding column from tsv file",
                    categorySelectTitle: "Recommended Categories",
                    assessmentInstructions: `
                    Assessment Tool annotation workflow:<br>
                    1) (ABOVE) Label all columns containing data from assessment tools with the 'Assessment Tool' category on the left.<br>
                    2) (BELOW) From the dropdown, select each assessment tool present in your data.<br>
                    3) (BELOW) Select each assessment tool, then click the corresponding columns on the right to link them to the tool.<br>
                    Optional: (ABOVE) If you cannot find an assessment tool or cannot link all columns, 
                    you must manually remove the 'Assessment Tool' from the unlinked columns before proceeding.
                    `
                }
            };
        },
        computed: {
            ...mapGetters([
                "getCategoryNames"
            ])
        },
        mounted() {
            // Set selected category to the first category by default
            this.setSelectedCategory(this.getCategoryNames[0]);
        },
        methods: {
            setSelectedCategory(p_category) {
                // Save the name of the selected category
                this.selectedCategory = p_category;
            }
        }
    };

</script>
