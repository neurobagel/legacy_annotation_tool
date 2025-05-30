<template>

    <div>

        <b-row align-h="center">
            <b-col cols="6">
                <b-alert v-model="outputIsInvalid" variant="danger">
                    <h1>Incomplete Annotations</h1>
                    There are incomplete annotations for columns that were mapped to variables.
                    You can go back and complete these annotations before you download the .json data dictionary.
                    <br /><br />
                    The following columns have incomplete annotations:
                    <ul v-for="column in incompleteAnnotations" :key="column">
                        <li>{{ column }}</li>
                    </ul>
                    <b>NOTE</b>: If you download the .json data dictionary, without completing the annotations,
                    the data dictionary will not work with subsequent neurobagel steps.
                    <br />
                    <b>
                        You will not be able to load the data dictionary into the annotation tool to change
                        mistakes later.
                    </b>
                    <br /><br />
                    <b-button
                        data-cy="button-backtoannotation"
                        variant="success"
                        @click="navigateToPage('annotation');">
                        Take me back to the Annotation!
                    </b-button>

                </b-alert>

                <b-alert v-model="outputIsValid" variant="success" :show="dictionaryCollapsed">
                    <h1>🎉 Congratulations!</h1>
                    You have successfully created a <a href="https://neurobagel.org/data_models/dictionaries/" target="_blank">neurobagel annotated .json data dictionary</a>.
                </b-alert>

                <h3>Data Dictionary</h3>
                <p>
                    Here is the final .json data dictionary that you have created:
                </p>
                <b-button data-cy="dictionary-preview-button" size="sm" @click="dictionaryCollapsed = !dictionaryCollapsed">
                    {{ dictionaryCollapsed ? 'Hide' : 'Show' }} Data Dictionary
                </b-button>
                <b-collapse data-cy="dictionary-preview" v-model="dictionaryCollapsed">
                    <pre>{{ formatJson(getJsonOutput) }}</pre>
                </b-collapse>
                <p>
                    Here are some next steps:
                </p>
                <ul>
                    <li>Download the .json data dictionary to your local hard drive by clicking the green "Download" button.</li>
                    <li>Use the .json data dictionary to <a href="https://neurobagel.org/user_guide/cli/" target="_blank">create a harmonized view of your data</a></li>
                    <li>Learn more about <a href="https://neurobagel.org/" target="_blank">neurobagel</a> and how to use harmonized data for cross-dataset search.</li>
                </ul>
            </b-col>

        </b-row>

        <b-row align-h="center">

            <!-- Button to download the annotation output data -->
            <b-col cols="3">
                <b-form-checkbox
                    v-if="outputIsInvalid"
                    data-cy="force-allow-download"
                    v-model="forceAllowDownload"
                    name="check-button"
                    switch>
                    Let me download, I know what I'm doing!
                </b-form-checkbox>
                <b-button
                    data-cy="download-button"
                    :variant="outputIsInvalid ? 'danger' : 'success'"
                    :disabled="!allowDownload"
                    @click="fileSaverSaveAs(getJsonOutput)">
                    {{ uiText.downloadButton }}
                </b-button>
            </b-col>

        </b-row>
        <b-row align-h="center">
            <b-col cols="3">
                <b-button
                    @click="restartAnnotation">
                    {{ uiText.restartButton }}
                </b-button>
            </b-col>
        </b-row>

    </div>

</template>

<script>
    import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
    import { saveAs } from "file-saver";
    import Ajv from "ajv";
    import jsonSchema from "@/assets/neurobagel_data_dictionary.schema.json";

    export default {

        name: "DownloadPage",

        data() {

            return {

                dictionaryCollapsed: false,

                jsonSpacing: 4,

                // Size of the file display textboxes
                // NOTE: Leaving this in for data dictionary preview text box
                textArea: {

                    height: 800,
                    width: 5
                },

                // Text for UI elements
                uiText: {

                    downloadButton: "Download Annotated Data",
                    restartButton: "Annotate Another Dataset"
                },

                incompleteAnnotations: [],

                forceAllowDownload: false
            };
        },

        computed: {

            ...mapGetters([

                "getJsonOutput"
            ]),

            ...mapState([

                "dataDictionary"
            ]),

            dataDictionaryFilenameNoExtension() {

                // Dataset name is original data table filename with no extension
                return this.dataDictionary.filename.split(".").slice(0, -1).join(".");
            },

            defaultOutputFilename() {

                return `${this.dataDictionaryFilenameNoExtension}_annotated_${Date.now()}.json`;
            },

            outputIsValid() {
                // Perform JSON schema validation and update validationError
                const ajv = new Ajv();
                const isValid = ajv.validate(jsonSchema, this.getJsonOutput);
                if (!isValid) {
                    this.setIncompleteAnnotations(ajv.errorsText());
                }
                return isValid;
            },
            outputIsInvalid() {
                return !this.outputIsValid;
            },
            allowDownload() {
                return this.outputIsValid || this.forceAllowDownload;
            }
        },

        methods: {
            ...mapMutations([
                "resetState"
            ]),

            ...mapActions([
                "navigateToPage"
            ]),

            restartAnnotation() {
                this.resetState();
                this.navigateToPage("home");
            },
            formatJson(p_jsonData) {
                if (p_jsonData) {
                    return JSON.stringify(p_jsonData, null, this.jsonSpacing);
                } else {
                    return '{}';
                }
            },
            fileSaverSaveAs(p_jsonData) {

                // 1. Create a blob version of the JSON output file
                const blob = new Blob([JSON.stringify(p_jsonData, null, this.jsonSpacing)], {type: "text/plain;charset=utf-8"});

                // 2. Open 'save as' file dialog box to allow user to save JSON output file to user's computer
                saveAs(blob, this.defaultOutputFilename);
            },
            setIncompleteAnnotations(p_error) {
                // Grab the columns that are failing validations. They start by "data" and are sometimes followed by more text
                this.incompleteAnnotations = [... new Set(p_error.split(",").map(error => error.split("/")[1].split(" ")[0]))];
            }
        }
    };

</script>

<style scoped>
pre {
  max-height: 400px;
  overflow-y: auto;
}
</style>
