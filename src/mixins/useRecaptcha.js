export default {
    data() {
        return {
            recaptchaToken: '',
        }
    },

    mounted() {
        const recaptchaScript = document.createElement("script");
        recaptchaScript.setAttribute("src", "https://www.google.com/recaptcha/api.js?render=explicit");
        document.head.appendChild(recaptchaScript);

        // Render reCAPTCHA and set token on completion
        recaptchaScript.onload = () => {
            grecaptcha.ready(() => {
                grecaptcha.render("recaptcha-container", {
                    sitekey: "6LcdanMqAAAAAPO3rAtn-EuuC5q2YD-aFcLAVQo8",
                    callback: (token) => {
                        this.recaptchaToken = token; // Set token when user clicks the checkbox
                    }
                });
            });
        };
    }
}