import { defineComponent } from 'vue';
import carmakers from "@/assets/carmakers.json";

interface CarLogo {
    name: string,
    path: string,
}
export default defineComponent({
    data() {
      return {
          logoImports: {},
          carmakers: carmakers.brands as CarLogo[],
      }
    },
    created() {
        this.logoImports = import.meta.glob('/src/assets/carlogos/*');
    },
    methods: {
        async getLogo(brandName: string) {
            const brand = this.carmakers.find((b) => b.name === brandName);
            if (!brand) return null;

            // Dynamically load the logo if it's available
            const importLogo = this.logoImports[`/src/assets/carlogos/${brand.path}`];
            if (importLogo) {
                const module = await importLogo();
                return module.default;
            }
            return null;
        }
    }
})