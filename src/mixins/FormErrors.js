export default {
    data() {
        return {
            formErrors: null,
        }
    },

    methods: {
        parseFormErrors(response) {
            this.formErrors = {};
            if (response.errors) {
                this.formErrors = response.errors;
            } else {
                this.formErrors.generic = 'Something went wrong with your request.'
            }
        },
        resetFormErrors() {
            this.formErrors = null;
        }
    },
}