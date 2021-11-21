const { board } = window.miro;

async function init() {
  await board.ui.on("icon:click", async () => {
    await board.ui.openPanel({ pageUrl: "./panel/build/index.html" });
  });
}

init();