window.VisionWorkspace = (() => {
  const profiles = {
    calibration: {title:'Calibrate a camera', project:'camera-calibration', description:'Estimate camera intrinsics, lens distortion and target poses from multiple views of a flat chessboard.', sample:Array.from({length:9},(_,i)=>'img'+i+'.jpg')},
    motion: {title:'Segment moving instruments', project:'fluoroscopy-instrument-segmentation', description:'Measure motion against the first image of a sequence. Tune the intensity threshold and remove small connected components.', sample:Array.from({length:10},(_,i)=>'frame_'+(201+i*10)+'.png')}
  };
  const numberField = (name,label,value,min,max,step=1) => `<label>${label}<input type="number" name="${name}" min="${min}" max="${max}" step="${step}" value="${value}" required></label>`;
  function page(mode) {
    const profile = profiles[mode];
    return `<div class="container lab-page"><nav class="crumbs"><a href="#/">Home</a> / Workspace</nav>
    <header><p class="studio-byline">Image processing workspace</p><h1>${profile.title}</h1><p>${profile.description}</p></header>
    <nav class="lab-switch" aria-label="Select experiment">${Object.entries(profiles).map(([key,p])=>`<a href="#/workspace/${key}" ${key===mode?'aria-current="page"':''}>${p.title}</a>`).join('')}</nav>
    <div class="lab-layout"><form class="lab-panel" id="run-config"><h2>Inputs</h2><label>Image source<select name="source"><option value="sample">Project dataset</option><option value="local">My images</option></select></label>
    <label class="lab-upload" hidden>Choose PNG or JPEG images<input type="file" name="files" multiple accept="image/png,image/jpeg"></label>
    <p class="lab-hint" id="input-summary"></p><h2>Parameters</h2>
    ${mode==='calibration'?numberField('columns','Inner corners across',8,2,40)+numberField('rows','Inner corners down',6,2,40)+numberField('pitch','Square pitch (mm)',30,.01,1000,.01):numberField('threshold','Intensity threshold (0–255)',12,0,255)+numberField('minimum','Minimum area (pixels)',12,1,100000)}
    <button class="btn btn-primary" id="lab-run">Run analysis →</button><button class="btn btn-outline" type="button" id="lab-cancel" hidden>Cancel run</button>
    <p class="lab-hint">Images are processed on your device. The first run downloads Python and OpenCV.</p></form>
    <section class="lab-panel lab-output"><div class="studio-heading"><h2>Image inspector</h2><select id="lab-view" aria-label="Select image"></select></div>
    <div class="lab-canvas"><img id="lab-image" alt="Selected input image"></div><div class="lab-tools"><label><input type="checkbox" id="lab-original" checked disabled> Show input</label><output id="lab-status" role="status"></output></div>
    <p id="lab-measure"></p><div class="lab-tools"><button type="button" id="lab-json" disabled>Export run JSON</button><button type="button" id="lab-png" disabled>Download result PNG</button></div></section></div>
    <aside class="lab-method"><strong>Method</strong> ${mode==='calibration'?'The workbench refines the camera model with OpenCV and estimates distortion. The case study documents the linear Zhang implementation. Cyan circles are measurements and orange crosses are reprojections.':'The workbench runs the fixed-reference baseline. White pixels represent detected motion. The first image is the reference and produces an empty mask. The case study also evaluates a supervised tracing method.'} <a href="#/projects/${profile.project}">Read the case study →</a></aside></div>`;
  }
  let cleanup = () => {};
  function mount(mode) {
    const form = document.querySelector('#run-config'), profile = profiles[mode], get = id=>document.getElementById(id);
    const view=get('lab-view'), original=get('lab-original'), status=get('lab-status'), photo=get('lab-image');
    let inputs=[], result=null, worker=null, generation=0, workerURL=null;
    function stop() {
      generation++;
      if(worker)worker.terminate();
      worker=null;
      if(workerURL)URL.revokeObjectURL(workerURL);
      workerURL=null;
      for(const field of form.elements)field.disabled=false;
      get('lab-cancel').hidden=true;
    }
    function release(){for(const i of inputs)if(i.file)URL.revokeObjectURL(i.url);}
    cleanup=()=>{stop();release();cleanup=()=>{};};
    function inspect(){
      const index=view.selectedIndex, item=result?.views.find(v=>v.index===index), input=inputs[index];
      original.disabled=!item;
      get('lab-png').disabled=!item;get('lab-json').disabled=!result;
      if(!input){photo.removeAttribute('src');photo.hidden=true;}else{
        photo.hidden=false;photo.src=item&&!original.checked?'data:image/png;base64,'+item.png:input.url;
        photo.alt=input.name+(item&&!original.checked?' · analysis result':' · source image');
      }
      get('lab-measure').textContent=item?(mode==='calibration'?'View RMS error '+item.rms_px.toFixed(3)+' px':'Detected foreground: '+item.foreground_pixels.toLocaleString()+' pixels'):result?'Chessboard not detected in this view.':'';
    }
    function resetInputs(){
      stop();release();result=null;original.checked=true;
      const local=form.elements.source.value==='local';
      form.querySelector('.lab-upload').hidden=!local;
      inputs=local?Array.from(form.elements.files.files).sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true})).map(file=>({name:file.name,file,url:URL.createObjectURL(file)})):profile.sample.map(name=>({name,url:'lab/samples/'+name}));
      view.replaceChildren(...inputs.map((i,n)=>new Option(i.name,String(n))));
      get('input-summary').textContent=inputs.length+' images'+(mode==='motion'&&inputs.length?' · Reference: '+inputs[0].name:'')+(local?' · Sorted by filename':'');
      status.textContent=inputs.length?'Ready to run':'Choose images to begin';inspect();
    }
    form.elements.source.onchange=resetInputs;form.elements.files.onchange=resetInputs;
    form.oninput=e=>{if(e.target.type==='number'&&result){result=null;original.checked=true;status.textContent='Parameters changed. Run again.';inspect();}};
    view.onchange=inspect;original.onchange=inspect;
    get('lab-cancel').onclick=()=>{stop();status.textContent='Run cancelled';};
    async function fetchOK(url){const r=await fetch(url);if(!r.ok)throw Error('Could not load '+url);return r;}
    form.onsubmit=async e=>{
      e.preventDefault();const minimum=mode==='calibration'?3:2;
      if(inputs.length<minimum){status.textContent='Choose at least '+minimum+' images.';return;}
      stop();const run=generation;result=null;original.checked=true;inspect();
      const settings={mode};for(const el of form.querySelectorAll('input[type=number]'))settings[el.name]=Number(el.value);
      for(const el of form.elements)el.disabled=true;
      get('lab-cancel').hidden=false;get('lab-cancel').disabled=false;status.textContent='Loading images…';
      function failed(message){if(run===generation){stop();status.textContent=message;}}
      try{
        const [program,source,files]=await Promise.all([
          fetchOK('lab/compute.py').then(r=>r.text()),fetchOK('lab/worker.js').then(r=>r.text()),
          Promise.all(inputs.map(async i=>i.file?i.file.arrayBuffer():(await fetchOK(i.url)).arrayBuffer()))]);
        if(run!==generation)return;
        workerURL=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));worker=new Worker(workerURL);
        worker.onerror=e=>failed(e.message || 'Could not start the processing engine.');
        worker.onmessage=({data})=>{
          if(run!==generation)return;
          if(data.error){failed(data.error);return;}
          if(data.status){status.textContent=data.status;return;}
          result={...data.result,settings,filenames:inputs.map(i=>i.name)};
          stop();view.selectedIndex=result.views[mode==='motion'?result.views.length-1:0].index;original.checked=false;
          status.textContent=mode==='calibration'?result.views.length+'/'+inputs.length+' views fitted · RMS '+result.rms_px.toFixed(3)+' px':result.views.length+' masks ready';
          inspect();
        };
        worker.postMessage({program,files,names:inputs.map(i=>i.name),settings},files);
      }catch(error){failed(error.message);}
    };
    function download(url,name){const a=document.createElement('a');a.href=url;a.download=name;a.click();}
    get('lab-json').onclick=()=>{const data={...result,views:result.views.map(({png,...rest})=>rest)};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));download(url,mode+'-run.json');setTimeout(()=>URL.revokeObjectURL(url),1500);};
    get('lab-png').onclick=()=>{const i=view.selectedIndex;download('data:image/png;base64,'+result.views.find(v=>v.index===i).png,inputs[i].name.replace(/\.[^.]+$/,'')+'-result.png');};
    resetInputs();
  }
  return {page,mount,leave:()=>cleanup(),has:mode=>Object.hasOwn(profiles,mode)};
})();
