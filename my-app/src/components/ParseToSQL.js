import 'react-dropdown/style.css';
export default function ParseToSQL() {
    const parseToSql = (tableName, objectToParse) => {
        let result = `CREATE TABLE  ${tableName} (`;
        //collection of attributes
        const columnDataArr = [];
        for (let columnData of Object.keys(objectToParse)) {
            let tempRow = '';
            tempRow += `${columnData} ${objectToParse[columnData].dataType} `;
            if (objectToParse[columnData].primary) {
                tempRow += 'PRIMARY KEY '
            }
            columnDataArr.push(tempRow)
        }
        result += `${columnDataArr.join(',')})`;
        return result;
    }
    let parseMap = (tablesToParse) => {
        let listOfTables = Object.keys(tablesToParse);
        let result = []
        for (let i of listOfTables) {
            result.push(parseToSql(i, tablesToParse[i]));
        }
        return result;
    };
    let sample = {
        emp: {
            id: { dataType: "int", primary: true, foreign: false },
            name: { dataType: "varchar(255)", primary: true, foreign: false },
            order_id: { dataType: "int", primary: false, foreign: false },
        },
        dept: {
            id: { dataType: "int", primary: true, foreign: false },
            deptname: { dataType: "int", primary: false, foreign: false },
            deptno: { dataType: "int", primary: false, foreign: false },
        },
        sal: {
            salcat: { dataType: "int", primary: true, foreign: false },
            value: { dataType: "int", primary: false, foreign: false },
            saltax: { dataType: "int", primary: false, foreign: false },
        },
    };
    console.log(parseMap(sample));
    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    return (
        <div className="ParseToSQL">
            <div className="button-dropdown">
                <button class="export-json">Export JSON</button>
                <select class="select">
                    <option value="1">Schema</option>
                    <option value="2">Code</option>
                </select>
            </div>
            <div className="tables">
                <div className="TableName-Fields-DeleteBtns">
                    <h1 className="tableName">Emp</h1>
                    <div className="Fields-DeleteBtns">
                        <div className="Fields">
                            <div className="tablerow">
                                <h3 className="Field">ID</h3>
                                <button class="save">Save</button>
                                <button class="delete">Delete</button>
                            </div>
                            <div className="tablerow">
                                <h3 className="Field">Name</h3>
                                <button class="save">Save</button>
                                <button class="delete">Delete</button>
                            </div>
                            <div className="tablerow">
                                <h3 className="Field">orderID</h3>
                                <button class="save">Save</button>
                                <button class="delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="TableName-Fields-DeleteBtns">
                    <h1 className="tableName">Emp</h1>
                    <div className="Fields-DeleteBtns">
                        <div className="Fields">
                            <div className="tablerow">
                                <h3 className="Field">ID</h3>
                                <button class="save">Save</button>
                                <button class="delete">Delete</button>
                            </div>
                            <div className="tablerow">
                                <h3 className="Field">Name</h3>
                                <button class="save">Save</button>
                                <button class="delete">Delete</button>
                            </div>
                            <div className="tablerow">
                                <h3 className="Field">orderID</h3>
                                <button class="save">Save</button>
                                <button class="delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};