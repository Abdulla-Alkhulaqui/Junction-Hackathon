const { board } = window.miro;

const colors = {
  PRIMARY: '#4263FF',
  WHITE: '#ffffff'
};

const dimensions = {
  WIDTH_TABLE: 900,
  HEIGHT_TABLE: 300,
  WIDTH_TITLE: 800,
  HEIGHT_TITLE: 50,
  OFFSET_TITLE_Y: 20,
  OFFSET_FIRST_ROW: 100,
};

const columnNames = ["primary", "name", "type", "extras"];

const MOCK_DATA = [
  {
    title: "DEPT",
  }
]

async function init() {
  const onCreateSchemas = async () => {
    const items = await board.get();
    console.log(items);

    items.map(async item => {
      await board.remove(item);
    });
  }

  const createTableTitle = async  (table, data) => {
    console.log(table);
    if (table.x === undefined || table.y === undefined) {
      console.error(`Please provide arg.x and arg.y at ${createTableTitle.name}`);
      return;
    }

    const getCurrentY = () => (-(table.height / 2) + (dimensions.HEIGHT_TITLE / 2)) + dimensions.OFFSET_TITLE_Y;

    const rect = await board.createShape({
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
            ${data.title}
        </p>
      `,
      y: getCurrentY(),
    });

    await rect.sync();
  }

  const createFirstRowTable = (table) => {
    const getCurrentY = () => (-(table.height / 2) + (20 / 2)) + dimensions.OFFSET_FIRST_ROW;

    const createBlueText = async () => {
      return await board.createText({
        content: `
        <p style="color: ${colors.WHITE}; font-weight: bold; font-family: Formular, Arial, sans-serif; ">
            ${data.title}
        </p>
      `,
        y: getCurrentY(),
      });
    }
  }

  const createTable = async (data) => {
    const table = await board.createShape({
      width: dimensions.WIDTH_TABLE,
      height: dimensions.HEIGHT_TABLE,
      style: {
        fillColor: colors.WHITE,
      },
      shape: "round_rectangle"
    });
    await createTableTitle(table, data);

    return table;
  }

  await onCreateSchemas();
  for (let mock of MOCK_DATA) {
    await createTable(mock);
  }



  // console.log(background);
  //
  // await board.viewport.zoomTo(frame);
}

init()
    .then()
    .catch(e => {
      console.error(e);
    });
