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

const columnNames = [ "name", "type", "primary", "extras", "foreign"];

async function init() {
  let boardShape = null;
  let firstShape = null;
  let lastShape = null;
  let tableData = (JSON.parse(localStorage.getItem('tableData')));
  let tableNameObj = "";
  let createdTablesNumber = (+localStorage.getItem('createdTablesNumber'));
  if (!isNaN(createdTablesNumber)) {
    createdTablesNumber++;
  }

  const changeTableFields = (tableFields) => {
    return Object.values(tableFields).map(i => [i.fieldId, i.fieldValue, i.primary ?? false,  "default", i.foreign ?? false  ]);
  }

  const takeContentInput = (content) => content.content.replace(/<[^>]+>/g, '');

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

    tableNameObj = await board.createText({
      content: `<p datatype="table-name" resource="table" style="color: ${colors.WHITE}; font-weight: bold; font-family: Formular, Arial, sans-serif; ">${data.tableName}</p>`,
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
    let name;
    const createText = async (text, x, y, index) => {
      let column;
      switch (index) {
        case 0:
          column = 'name'
          name = text
          break;
        case 2:
          column = 'primary'
          break;
        case 1:
          column = 'type'
          break;
        case 3:
          column = 'extras'
          break;
        case 4:
          column = 'foreign'
          break;
      }

      return await board.createText({
        content: `<p accesskey="${takeContentInput(tableNameObj)}" resource="${name}" datatype="${column}" style="color: #000000; font-weight: 900; font-family: Formular, Arial, sans-serif;">${text}</p>`,
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
    let i = 0;
    for (const column of data) {
      let blueText =  await createText(column, x, rect.y, i);
      x += blueText.width + 70;
      i++;
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

  await createViewData();
  localStorage.setItem('createdTablesNumber', String(createdTablesNumber));
  console.log(localStorage.getItem('createdTablesNumber'));
}

async function createViewData() {
  const items = (await board.get())
      .filter(item => item.type === "text")
      .filter(item => item.content.includes('resource='));

  const takeByDataType = (type) => items.filter(i => i.content.includes(`datatype="${type}"`));
  const takeByResource = (resource, datatypeIgnore = false) =>
      datatypeIgnore ? items.filter(i => !i.content.includes(`datatype="${datatypeIgnore}"`) && i.content.includes(`resource="${resource}"`))
         :items.filter(i => i.content.includes(`resource="${resource}"`));
  const takeContentInput = (content) => content.content.replace(/<[^>]+>/g, '');

  function createElementFromString(str) {
    const element = new DOMParser().parseFromString(str, 'text/html');
    return element.documentElement.querySelector('body').firstChild;
  };

  const takeParent = (field) => {
    const element = createElementFromString(field.content);
    return element.getAttribute("accesskey");
  };

  const nameColumns = takeByDataType("name");

  const tableRows = nameColumns.map(name => ({
    id: name.id,
    parent: takeParent(name),
    content: takeContentInput(name),
    children: takeByResource(takeContentInput(name), "name")
        .map(i => ({
      id: i.id,
      content: takeContentInput(i),
      parent: name.id,
      children: []
    }))
  }));

  const tableNames = takeByDataType("table-name");

  return tableNames.map(table => ({
    id: table.id,
    parent: null,
    content: takeContentInput(table),
    children: tableRows.filter(i => {
      return i.parent === takeContentInput(table)
    }),
  }));
}

async function openDialog() {
  await board.ui.openModal({ pageUrl: './dialog/build/index.html', maxWidth: 800, maxHeight: 1000 });
}


async function closeDialog() {
  await board.ui.closeModal();
}

async function updateBoardState(id, newState) {
  const item = (await board.get()).filter(item => item.id === id);
  if (item.length > 0) {
      item[0].content = `<p datatype="table-name" resource="table" style="color: #000000; font-weight: bold; font-family: Formular, Arial, sans-serif; ">${newState}</p>`;

      await item[0].sync();
    console.log(item[0].content);
  }  else {
    console.error('Wrong id provided');
  }
}

async function removeBoardObject(id) {

}

window.updateBoardState = updateBoardState;

window.openDialog = openDialog;
window.closeDialog = closeDialog;


window.init = init;
window.createViewData = createViewData;