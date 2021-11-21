const { board } = window.miro;

const colors = {
  PRIMARY: '#4263FF',
  WHITE: '#ffffff'
};

const dimensions = {
  WIDTH_TABLE: 900,
  HEIGHT_TABLE: 100,
  WIDTH_TITLE: 800,
  HEIGHT_TITLE: 50,
  OFFSET_TITLE_Y: 20,
  OFFSET_FIRST_ROW: 100,
  OFFSET_ROW: 70,
};

const columnNames = ["primary", "name", "type", "extras", "foreign"];
const MOCK_ENTITY = [true, "id", "int", "custom", true];
// const MOCK_DATA = [
//   {
//     tableName: "DEPT",
//     firstRow: columnNames,
//     fields: Array(1).fill(0).map(() => MOCK_ENTITY)
//   }
// ];

async function init() {
  let boardShape = null;
  let firstShape = null;
  let lastShape = null;
  let tableData = (JSON.parse(localStorage.getItem('tableData')));

  const changeTableFields = (tableFields) => {
    return Object.values(tableFields).map(i => [i.primary ?? false, i.fieldId, i.fieldValue,  "default", i.foreign ?? false  ]);
  }

  tableData = {
    tableName: tableData.tableName,
    firstRow: columnNames,
    fields: changeTableFields(tableData.tableFields)
  };

  console.log(tableData);



  const onCreateSchemas = async () => {
    const items = await board.get();

    items.map(async item => {
      await board.remove(item);
    });
  }

  const createTableTitle = async  (table, data) => {
    if (table.x === undefined || table.y === undefined) {
      console.error(`Please provide arg.x and arg.y at ${createTableTitle.name}`);
      return;
    }

    const getCurrentY = () => (-(table.height / 2) + (dimensions.HEIGHT_TITLE / 2)) + dimensions.OFFSET_TITLE_Y;

    const shape = await board.createShape({
      width: dimensions.WIDTH_TITLE,
      height: dimensions.HEIGHT_TITLE,
      style: {
        fillColor: colors.PRIMARY,
      },
      shape: "round_rectangle",
      y: getCurrentY()
    });

    await board.createText({
      content: `
        <p style="color: ${colors.WHITE}; font-weight: bold; font-family: Formular, Arial, sans-serif; ">
            ${data.tableName}
        </p>
      `,
      y: getCurrentY(),
    });

    await shape.sync();
    return shape;
  }

  const getCurrentY = (table, i = 1, offset = dimensions.OFFSET_FIRST_ROW) => (-(table.height / 2) + (20 / 2)) + offset * i;

  const createFirstRowTable = async (table, data) => {
    const createBlueText = async (text, x, y) => {
      return await board.createText({
        content: `<p style="color: ${colors.PRIMARY}; font-weight: 900; font-family: Formular, Arial, sans-serif;">${text}</p>`,
        y,
        x,
      });
    };

    firstShape = await board.createShape({
      width: dimensions.WIDTH_TITLE,
      height: dimensions.HEIGHT_TITLE,
      shape: "round_rectangle",
      y: getCurrentY(table)
    });

    let x = -((firstShape.width / 2) - 100);
    for (const column of data.firstRow) {
      let blueText =  await createBlueText(column, x, firstShape.y);
      x += blueText.width + 70;
    }
  }

  const createRow = async (table, data, index) => {
    const createText = async (text, x, y) => {
      return await board.createText({
        content: `<p style="color: #000000; font-weight: 900; font-family: Formular, Arial, sans-serif;">${text}</p>`,
        y,
        x
      });
    };

    const rect = await board.createShape({
      width: dimensions.WIDTH_TITLE,
      height: dimensions.HEIGHT_TITLE,
      shape: "round_rectangle",
      y: getCurrentY(table, index,  dimensions.OFFSET_ROW + 20)
    });

    let x = -((rect.width / 2) - 100);
    for (const column of data) {
      let blueText =  await createText(column, x, rect.y);
      x += blueText.width + 70;
    }

    return rect;
  }

  const createTable = async (data) => {
    const table = await board.createShape({
      width: dimensions.WIDTH_TABLE,
      height: dimensions.HEIGHT_TABLE * ( data.fields.length + (data.fields.length < 4 ? 2 : 1) ) ,
      style: {
        fillColor: colors.WHITE,
      },
      shape: "rectangle"
    });
    await createTableTitle(table, data);
    await createFirstRowTable(table, data);

    let index = 2;
    for (const row of data.fields) {
      lastShape = await createRow(table, row, index);
      console.log(lastShape);
      index++;
    }

    return table;
  }

  async function updateTableRect() {
    if (!boardShape || !firstShape || !lastShape) {
      console.error('Board shapes are not defined currently');
    }
  }

  await onCreateSchemas();

  for (const data of [tableData]) {
    boardShape = await createTable(data);
    if (boardShape) {
      await board.viewport.zoomTo(boardShape);
    }
  }
}

async function createViewData() {
  const ITEM_TYPE = {
    TABLE_NAME: 0,
    TABLE_FIELD: 1,
    TABLE_PROPERTY: 2,
  }
  const items = await board.get();
}


window.init = init;