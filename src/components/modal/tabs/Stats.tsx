import { useContext } from "react";
import { PokemonModalContext, PokemonModalContextType } from "../../../context/PokemonModalProvider";
import { formatStats } from "../../../utils/pokemon-helper";
import DataRow from "../dataRow/DataRow";

const Stats = () => {
    const { currentPokemon } = useContext(PokemonModalContext) as PokemonModalContextType;

    const stats = formatStats(currentPokemon?.stats);
    
    return (
        <>
            <h4>Base Stats</h4>

            <table>
                <tbody>
                    {
                        stats.map(stat => {
                            const { name, value, max } = stat;

                            return <DataRow key={ name } catergory={ name } value={ value } max={ max } />
                        })
                    }
                </tbody>
            </table>
        </>
    );
};

export default Stats;