import { getTypeIconSrc } from '../../utils/pokemon-helper';
import useTypes from '../../hooks/useTypes';

interface TypesBarProps {
    toggleType: (type: string) => void
}


const TypesBar = (props:TypesBarProps) => {
    const {toggleType} = props;
    const types = useTypes();
console.log('toggleType',toggleType);

    return (
        
        <nav className='types-bar'>
            {
            types?.map((type: { name: string }) => {
                const typeImg = getTypeIconSrc(type.name);
                return (
                     type.name!=='stellar' &&
                <a
                    key={ type.name }
                    className={ type.name }
                    onClick={ () => toggleType(type.name) }
                >
                    <img src={ typeImg } alt={ type.name } />
                </a>
                );
            })
            }
        </nav>
    );
};

export default TypesBar;