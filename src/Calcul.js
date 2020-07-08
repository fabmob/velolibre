import Engine, { formatValue } from "publicodes";
import rules from "./modèle.yaml";

// On initialise un moteur en lui donnant le publicode.
// Ce publicode va être parsé
const engine = new Engine(rules);
const résultat = engine.evaluate("empreinte");

export default `Empreinte de l'écotrain : ${formatValue(résultat)}`;
