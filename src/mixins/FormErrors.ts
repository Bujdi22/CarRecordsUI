import { defineComponent } from 'vue';

interface FormErrors {
    [key: string]: string[] | string;
}

export default defineComponent({
    data() {
        return {
            formErrors: null as FormErrors | null,
        };
    },

    methods: {
        parseFormErrors(response: { errors?: FormErrors }) {
            this.formErrors = {};

            if (response.errors) {
                this.formErrors = response.errors;
            } else {
                this.formErrors.generic = 'Something went wrong with your request.';
            }
        },

        resetFormErrors() {
            this.formErrors = null;
        },
    },
});