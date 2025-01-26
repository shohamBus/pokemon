import  React ,{ useContext } from 'react';
import DataRow from '../dataRow/DataRow';
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';
import { getTypeIconSrc } from 'utils/pokemon-helper';

export interface Ability {
    name: string;
}

const About = () => {
    const { currentPokemon } = useContext(PokemonModalContext) as PokemonModalContextType;

    
    return (
        <>
            <h4>Pokemon Data</h4>
                
            <table>
                <tbody>
                    <DataRow catergory={ 'height' } value={ currentPokemon?.height } />
                    <DataRow catergory={ 'weight' } value={ currentPokemon?.weight } />

                    <tr>
                        <td className='category'>Abilities</td>
                        <td>
                            <ol>
                                {
                                    currentPokemon?.abilities.map(({ ability, is_hidden }:{ability:Ability,is_hidden:boolean}) => {
                                        if(is_hidden) {
                                            return <small key={ ability.name }>{ ability.name } (hidden ability)</small>
                                        }
                                        
                                        return <li key={ ability.name }>{ ability.name}</li>
                                    })
                                }
                            </ol>
                        </td>
                    </tr>

                    <tr>
                        <td className='category'>Types</td>
                        <td>
                            {
                                currentPokemon?.types.map(({ name }:{ name:string}) => {
                                    const typeImage = getTypeIconSrc(name);

                                    return <img key={ name } className={ name } src={ typeImage } alt={ name } />
                                })
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default About;