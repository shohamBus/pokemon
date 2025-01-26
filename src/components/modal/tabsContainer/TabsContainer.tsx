import  React ,{ Suspense, useState } from 'react';

import './TabsContainer.scss'
import About from '../tabs/About';
import Stats from '../tabs/Stats';
import Evolution from '../tabs/Evolution';
import { Loader } from 'components/loader/Loader';

const TabsContainer = () => {
    const tabs = [
        { id: 'About', component: <About /> },
        { id: 'Stats', component: <Stats /> },
        { id: 'Evolution', component: <Evolution /> }
    ];

    const [currentTab, setCurrentTab] = useState(0);

    return (
        <>
            <nav>
                {
                    tabs.map(({ id }, index) => (
                        <button
                            key={ id }
                            className={ index === currentTab ? 'active' : undefined }
                            onClick={ () => setCurrentTab(index) }
                        >
                            { id }
                        </button>
                    ))
                }
            </nav>
            
            <div className='data-container'>
                <Suspense fallback={ <Loader /> }>
     { tabs[currentTab].component }
                </Suspense>
            </div>
        </>
    );
};

export default TabsContainer;