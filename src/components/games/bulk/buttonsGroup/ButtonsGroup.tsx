import React from "react";
import "./buttonsGroup.scss";

interface ButtonsGroupProps {
    level: number;
    setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const ButtonsGroup: React.FC<ButtonsGroupProps> = ({ level, setLevel }) => {

    return (
        <div className="buttons-group">
            <button className={`button easy ${level === 1 ? 'active' : ''}`} onClick={() => setLevel(1)}>
                <span className="icon">
                    Easy
                </span>
            </button>
            <button className={`button med ${level === 2 ? 'active' : ''}`} onClick={() => setLevel(2)}>
                <span className="icon">
                    Medium
                </span>
            </button>
            <button className={`button hard ${level === 3 ? 'active' : ''}`} onClick={() => setLevel(3)}>
                <span className="icon">
                    Hard
                </span>
            </button>
        </div>
    );
};

export default ButtonsGroup;