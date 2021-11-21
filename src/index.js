const { board } = window.miro;

async function init() {
  await board.ui.on("icon:click", async () => {
    await board.ui.openPanel({ pageUrl: "./panel/build/index.html" });
  });
}

init();

async function openDialog() {
  await board.ui.openModal({ pageUrl: './dialog/build/index.html', maxWidth: 800, maxHeight: 800 });
}


async function closeDialog() {
  await board.ui.closeModal();
}


window.openDialog = openDialog;
window.closeDialog = closeDialog;