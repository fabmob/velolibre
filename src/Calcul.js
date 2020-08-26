import Engine, { formatValue } from 'publicodes'
import './ui/index.css'
import rules from './modèle.yaml'

// On initialise un moteur en lui donnant le publicode.
// Ce publicode va être parsé
export const engine = new Engine(rules)
const evaluation = engine.evaluate('empreinte . par km voyageur')

export const résultat = `Empreinte totale de l'écotrain : ${formatValue(
	evaluation,
	{
		precision: 1,
	}
)}`
