const runtimeURL = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';
self.onmessage = async ({data}) => {
  try {
    self.postMessage({status:'Loading the Python and OpenCV runtime…'});
    importScripts(runtimeURL + 'pyodide.js');
    const python = await loadPyodide({indexURL:runtimeURL});
    await python.loadPackage('opencv-python');
    const paths = data.files.map((bytes,i) => {
      const path = '/tmp/view-' + i;
      python.FS.writeFile(path,new Uint8Array(bytes));
      return path;
    });
    python.globals.set('names_json',JSON.stringify(paths));
    python.globals.set('settings_json',JSON.stringify(data.settings));
    self.postMessage({status:'Processing ' + paths.length + ' images…'});
    const result = await python.runPythonAsync(data.program);
    self.postMessage({result:JSON.parse(result)});
  } catch(error) {
    self.postMessage({error:String(error.message || error).split('\n').filter(Boolean).pop()});
  }
};
