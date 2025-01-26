import React ,{ useContext } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './modal.scss';
import IntroModal from '../introModal/IntroModal';
import TabsContainer from '../tabsContainer/TabsContainer';
import { PokemonModalContext, PokemonModalContextType } from 'context/PokemonModalProvider';


const Modal = () => {
    const { isModalOpen, closeModal, currentPokemon } = useContext(PokemonModalContext) as PokemonModalContextType;
    
    return (
        <Dialog.Root
            open={ isModalOpen }
            onOpenChange={ (isOpen) => ! isOpen && closeModal() }>
        <Dialog.Portal>
        <Dialog.Overlay className='overlay' />
          <Dialog.Content
            className={ `modal ${ currentPokemon?.types[0]?.name }` }
            data-content={ currentPokemon?.name }
          >
            <IntroModal />
            <TabsContainer />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
};

export default Modal;