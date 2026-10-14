function plot_descent_summary(x1Grid,x2Grid,logObjective,results,iterates,labels,figureTitle)
% Three independent panels. Dedicated margins prevent labels from overlapping.
% The shared legend is drawn in its own bottom strip (never inside any axes).
numberOfMethods = numel(labels);
methodColors = lines(numberOfMethods);
fig = figure('Name',figureTitle,'Color','w','Position',[80 80 2000 1050]);

% Wide gaps between panels accommodate logarithmic tick labels and y labels.
objectiveAxes = axes('Parent',fig,'Units','normalized', ...
    'Position',[0.11 0.24 0.20 0.64]); hold(objectiveAxes,'on')
pathAxes = axes('Parent',fig,'Units','normalized', ...
    'Position',[0.43 0.24 0.20 0.64]); hold(pathAxes,'on')
gradientAxes = axes('Parent',fig,'Units','normalized', ...
    'Position',[0.75 0.24 0.20 0.64]); hold(gradientAxes,'on')

for methodIndex = 1:numberOfMethods
    semilogy(objectiveAxes,max(results{methodIndex}.crit(:),eps), ...
        'Color',methodColors(methodIndex,:),'LineWidth',1.5)
    semilogy(gradientAxes,max(results{methodIndex}.grad(:),eps), ...
        'Color',methodColors(methodIndex,:),'LineWidth',1.5)
end
objectiveAxes.YScale = 'log';
gradientAxes.YScale = 'log';
if numberOfMethods > 1
    objectiveAxes.XScale = 'log';
    gradientAxes.XScale = 'log';
end

contour(pathAxes,x1Grid,x2Grid,logObjective,24, ...
    'LineColor',[0.78 0.78 0.78]);
for methodIndex = 1:numberOfMethods
    points = iterates{methodIndex};
    plot(pathAxes,points(1,:),points(2,:), ...
        'Color',methodColors(methodIndex,:),'LineWidth',1.5)
    plot(pathAxes,points(1,1),points(2,1),'o', ...
        'Color',methodColors(methodIndex,:),'MarkerSize',4)
end
plot(pathAxes,1,1,'kp','MarkerFaceColor','k','MarkerSize',10)

set([objectiveAxes,pathAxes,gradientAxes],'FontSize',13,'LineWidth',1.0)
xlabel(objectiveAxes,'Iteration','FontSize',14)
title(objectiveAxes,'Objective (log scale)','FontSize',15)
xlabel(pathAxes,'x_1','FontSize',14)
ylabel(pathAxes,'x_2','FontSize',14)
title(pathAxes,'Paths (star = minimum)','FontSize',15)
xlabel(gradientAxes,'Iteration','FontSize',14)
title(gradientAxes,'Gradient norms (log scale)','FontSize',15)
grid(objectiveAxes,'on'); grid(pathAxes,'on'); grid(gradientAxes,'on')
objectiveAxes.XMinorGrid = 'off'; objectiveAxes.YMinorGrid = 'off';
gradientAxes.XMinorGrid = 'off'; gradientAxes.YMinorGrid = 'off';

% Manual figure-wide legend: no MATLAB legend auto-layout, no text collisions.
legendColumns = min(3,ceil(numberOfMethods/2));
legendWidth = 0.78;
legendLeft = 0.13;
legendCellWidth = legendWidth / legendColumns;
for methodIndex = 1:numberOfMethods
    column = mod(methodIndex-1,legendColumns);
    row = floor((methodIndex-1)/legendColumns);
    legendX = legendLeft + column*legendCellWidth;
    legendY = 0.12 - row*0.052;
    annotation(fig,'line',[legendX legendX+0.024],[legendY legendY], ...
        'Color',methodColors(methodIndex,:),'LineWidth',2)
    annotation(fig,'textbox',[legendX+0.030 legendY-0.018 ...
        legendCellWidth-0.035 0.038], ...
        'String',char(labels(methodIndex)),'Interpreter','none', ...
        'EdgeColor','none','FontSize',13,'VerticalAlignment','middle', ...
        'FitBoxToText','off');
end
end
