import React ,{ useContext } from "react";
import DataRow from "../dataRow/DataRow";
import { formatStats } from "utils/pokemon-helper";
import { PokemonModalContext, PokemonModalContextType } from "context/PokemonModalProvider";

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