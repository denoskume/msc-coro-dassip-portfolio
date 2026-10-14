%% MATSIP — Export all twelve Numerical Optimization figures (MATLAB ONLY)
% Executes the validated MATLAB report, saves genuine MATLAB figures as PNG,
% and verifies all expected outputs. No synthetic or manually drawn charts.
% Run from MATLAB: run('save_all_figures.m')
run(fullfile(fileparts(mfilename('fullpath')),'final_report.m'))

%% Save the exact figures produced by final_report.m
labFolder = fileparts(fileparts(mfilename('fullpath')));
figureFolder = fullfile(labFolder,'outputs','figures');
if ~isfolder(figureFolder), mkdir(figureFolder); end

fileNames = { ...
    '01_rosenbrock_surface.png', ...
    '02_fixed_step_comparison.png', ...
    '03_armijo_convergence.png', ...
    '04_four_methods_start_a.png', ...
    '05_six_methods_start_a.png', ...
    '06_four_methods_start_b.png', ...
    '07_six_methods_start_b.png', ...
    '08_original_noisy_signal.png', ...
    '09_enhanced_signal.png', ...
    '10_regularization_selection.png', ...
    '11_synthetic_nmr.png', ...
    '12_measured_nmr.png' ...
};

figureHandles = findall(groot,'Type','figure');
[~,order] = sort([figureHandles.Number]);
figureHandles = figureHandles(order);
assert(numel(figureHandles)==numel(fileNames), ...
    'Expected %d figures, but MATLAB produced %d.', ...
    numel(fileNames),numel(figureHandles))

%% High-resolution output — genuine MATLAB rendering (4K minimum)
% Enlarge the ACTUAL figure canvas before exporting. This redraws vectors,
% text, curves and axes directly inside MATLAB; it is NOT image upscaling.
for index = 1:numel(fileNames)
    fig = figureHandles(index);
    if ismember(index,[2 3 4 5 6 7])
        canvasSize = [60 60 1950 880]; % Three-panel optimization comparisons
    else
        canvasSize = [60 60 1700 950]; % Two-panel signal/NMR figures
    end
    set(fig,'Units','pixels','Position',canvasSize,'Color','w');
    axesHandles = findall(fig,'Type','axes');
    for axisIndex = 1:numel(axesHandles)
        ax = axesHandles(axisIndex);
        set(ax,'FontSize',max(15,ax.FontSize),'LineWidth',1.1)
    end
    legendHandles = findall(fig,'Type','legend');
    for legendIndex = 1:numel(legendHandles)
        leg = legendHandles(legendIndex);
        set(leg,'FontSize',max(13,leg.FontSize))
    end
    drawnow
    destination = fullfile(figureFolder,fileNames{index});
    exportgraphics(fig,destination,'Resolution',300)
    imageInfo = imfinfo(destination);
    assert(imageInfo.Width>=3840 && imageInfo.Height>=2160, ...
        'Figure %d resolution too low: %d x %d pixels', ...
        index,imageInfo.Width,imageInfo.Height)
    fileInfo = dir(destination);
    assert(~isempty(fileInfo) && fileInfo.bytes>20000, ...
        'HD figure export failed: %s',destination)
    fprintf('Saved 4K Figure %d: %s (%d x %d pixels, %d bytes)\n', ...
        index,fileNames{index},imageInfo.Width,imageInfo.Height,fileInfo.bytes)
end
fprintf('PASS: all %d authentic MATLAB PNG figures exported at 4K+ resolution\n',numel(fileNames))
