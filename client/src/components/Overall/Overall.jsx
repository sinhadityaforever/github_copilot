import React from 'react';
import './Overall.css';
import { expenseCardData } from '../../Data/Datanew';
import Solo from '../solo/solo';
import { useAppSelector } from '../../app/hooks';

const Overall = () => {     
    const categories = useAppSelector(
        (state) => state.transactionState.categories
    );
    return (
        <div className="Cards">
            {expenseCardData.map((card, id) => {
                return (
                    <div className="parentContainer" key={id}>
                        <Solo
                            categories={categories
                                .filter((category) => category.type === card.type)
                                .map((category) => category.value)}
                            title={card.title}
                            color={card.color}
                            png={card.png}
                            type={card.type}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default Overall;


