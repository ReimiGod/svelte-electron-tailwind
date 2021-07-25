<script>
  let test;
  let value = "";

  globalThis.electron.receive("test", (data) => {
    test = data;
  });

  async function testFunc() {
    test = await globalThis.electron.testFunction("lalala");
  }

  function testFunc2() {
    globalThis.electron.send("toElectron", value);
  }
</script>

<header class="bg-white shadow">
  <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
  </div>
</header>
<main>
  <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <div
        class="flex flex-col items-center justify-center border-4 border-gray-200 border-dashed rounded-lg h-96"
      >
        <h1 class="text-3xl font-bold text-red-300">
          This is a Svelte + Electron + Tailwind setup
        </h1>
        <pre>{JSON.stringify(test, null, 2)}</pre>
        <button on:click={testFunc}>Test</button>
        <button on:click={testFunc2}>Test2</button>
        <input bind:value />
        <p>Input value: {value}</p>
      </div>
    </div>
  </div>
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
