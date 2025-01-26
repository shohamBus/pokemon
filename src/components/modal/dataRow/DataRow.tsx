import './dataRow.scss'

interface DataRowProps {
    catergory:string;
    value:number;
    max?:number;
}

const DataRow = (props:DataRowProps) => {
    const {catergory,value,max}=props;
    
    return (
        <tr>
            <td className='category'>{ catergory }</td>
            <td className="stats-number">{ value }</td>
            {
                max &&
                <td className="range-slide">
                    <div className="range-slide-fill" style={{ "--precentage": (value / max) * 100 + '%' } as React.CSSProperties}></div>
                </td>
            }
        </tr>
    );
};

export default DataRow;