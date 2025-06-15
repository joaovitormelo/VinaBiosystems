import { UtilityFunctions } from "../UtilityFunctions";


describe("Utility Functions", () => {
    it("Deve retornar ´CANCELADO´ para situation 'canceled'", () => {
        const result = UtilityFunctions.getSituationLabel("canceled");
        expect(result).toBe("CANCELADO");
    });
    it("Deve retornar ´FECHADO´ para situation 'closed'", () => {
        const result = UtilityFunctions.getSituationLabel("closed");
        expect(result).toBe("FECHADO");
    });
    it("Deve retornar ´EM ABERTO´ para outra situação", () => {
        const result = UtilityFunctions.getSituationLabel("open");
        expect(result).toBe("EM ABERTO");
    });
});