function plot_descent_summary(x1Grid,x2Grid,logObjective,results,iterates,labels,figureTitle)
% Compare algorithms with a shared legend BELOW the panels.
% tiledlayout reserves space for titles, axis labels and the legend.
numberOfMethods = numel(labels);
methodColors = lines(numberOfMethods);
figure('Name',figureTitle,'Color','w','Position',[80 80 1850 850])
layout = tiledlayout(1,3,'TileSpacing','loose','Padding','loose');

% First panel: one line per method, with uncluttered logarithmic histories.
objectiveAxes = nexttile(layout); hold(objectiveAxes,'on')
objectiveLines = gobjects(numberOfMethods,1);
for methodIndex = 1:numberOfMethods
    objectiveLines(methodIndex) = semilogy(objectiveAxes, ...
        max(results{methodIndex}.crit(:),eps), ...
        'Color',methodColors(methodIndex,:),'LineWidth',1.5);
end
objectiveAxes.YScale = 'log';
if numberOfMethods > 1, objectiveAxes.XScale = 'log'; end
xlabel(objectiveAxes,'Iteration','FontSize',14)
ylabel(objectiveAxes,'Objective f(x_k)','FontSize',14)
title(objectiveAxes,'Objective (log scale)','FontSize',15)
grid(objectiveAxes,'on')
objectiveAxes.XMinorGrid = 'off';
objectiveAxes.YMinorGrid = 'off';

% Second panel: trajectories and the known Rosenbrock minimizer.
pathAxes = nexttile(layout);
contour(pathAxes,x1Grid,x2Grid,logObjective,24, ...
    'LineColor',[0.78 0.78 0.78]); hold(pathAxes,'on')
for methodIndex = 1:numberOfMethods
    points = iterates{methodIndex};
    plot(pathAxes,points(1,:),points(2,:), ...
        'Color',methodColors(methodIndex,:),'LineWidth',1.5)
    plot(pathAxes,points(1,1),points(2,1),'o', ...
        'Color',methodColors(methodIndex,:),'MarkerSize',4)
end
plot(pathAxes,1,1,'kp','MarkerFaceColor','k','MarkerSize',10)
xlabel(pathAxes,'x_1','FontSize',14)
ylabel(pathAxes,'x_2','FontSize',14)
title(pathAxes,'Paths (star = minimum)','FontSize',15)
grid(pathAxes,'on')

% Third panel: gradient norm on its own logarithmic axis.
gradientAxes = nexttile(layout); hold(gradientAxes,'on')
for methodIndex = 1:numberOfMethods
    semilogy(gradientAxes,max(results{methodIndex}.grad(:),eps), ...
        'Color',methodColors(methodIndex,:),'LineWidth',1.5)
end
gradientAxes.YScale = 'log';
if numberOfMethods > 1, gradientAxes.XScale = 'log'; end
xlabel(gradientAxes,'Iteration','FontSize',14)
ylabel(gradientAxes,'||grad f(x_k)||','FontSize',14)
title(gradientAxes,'Gradient norms (log scale)','FontSize',15)
grid(gradientAxes,'on')
gradientAxes.XMinorGrid = 'off';
gradientAxes.YMinorGrid = 'off';

% A legend in the layout's own bottom strip NEVER covers plot titles.
methodsLegend = legend(objectiveAxes,objectiveLines,cellstr(labels), ...
    'Orientation','horizontal','NumColumns',min(3,numberOfMethods), ...
    'FontSize',13);
methodsLegend.Layout.Tile = 'south';
set([objectiveAxes,pathAxes,gradientAxes],'FontSize',13,'LineWidth',1.0)
end
