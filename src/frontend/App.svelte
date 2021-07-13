<script>
  const { ipcRenderer } = require("electron");

  ipcRenderer.on("test", () => {
    console.log("lala");
  });
</script>

<main>
  <h1>Svelte Electron!!!!!</h1>
  <p>This is a template for building Electron apps with SvelteJS!!</p>
</main>

<style>
  main {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  }

  h1 {
    color: orangered;
  }
</style>
