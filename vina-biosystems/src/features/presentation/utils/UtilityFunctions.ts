export class UtilityFunctions {
    static getSituationLabel(situation: string): string {
        switch(situation) {
          case 'canceled':
            return 'CANCELADO';
          case 'closed':
            return 'FECHADO';
          default:
           return 'EM ABERTO';
        }
    }
}