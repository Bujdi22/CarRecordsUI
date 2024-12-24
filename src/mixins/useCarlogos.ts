import { defineComponent } from 'vue';
export default defineComponent({
    data() {
      return {
          logoImports: {},
      }
    },
    created() {
        this.logoImports = import.meta.glob('/src/assets/carlogos/*');
    },
    methods: {
        async getLogo(brandName: string) {

            const fileName = brandName.toLowerCase().split(' ').join('') + '.png';

            // Dynamically load the logo if it's available
            const importLogo = this.logoImports[`/src/assets/carlogos/${fileName}`];
            if (importLogo) {
                const module = await importLogo();
                return module.default;
            }
            return null;
        }
    }
})