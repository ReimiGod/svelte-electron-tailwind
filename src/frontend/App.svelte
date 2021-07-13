<script>
  const { ipcRenderer } = require("electron");

  let test;

  ipcRenderer.on("test", (e, data) => {
    console.log("lala", data);
    test = data;
  });
</script>

<main>
  <h1>Svelte Electron!</h1>
  <p>This is a template for building Electron apps with SvelteJS!!</p>
  <pre>{JSON.stringify(test, null ,2)}</pre>
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
