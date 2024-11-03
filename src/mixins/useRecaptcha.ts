import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            recaptchaToken: '' as string,
        };
    },

    mounted() {
        const recaptchaScript = document.createElement("script");
        recaptchaScript.setAttribute("src", "https://www.google.com/recaptcha/api.js?render=explicit");
        document.head.appendChild(recaptchaScript);

        // Render reCAPTCHA and set token on completion
        recaptchaScript.onload = () => {
            // Check if grecaptcha is defined
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.ready(() => {
                    grecaptcha.render("recaptcha-container", {
                        sitekey: "6LcdanMqAAAAAPO3rAtn-EuuC5q2YD-aFcLAVQo8",
                        callback: (token: string) => {
                            this.recaptchaToken = token; // Set token when user clicks the checkbox
                        }
                    });
                });
            } else {
                console.error("grecaptcha is not defined.");
            }
        };
    }
});