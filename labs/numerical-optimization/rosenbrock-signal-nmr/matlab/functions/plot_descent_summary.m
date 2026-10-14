function plot_descent_summary(x1Grid,x2Grid,logObjective,results,iterates,labels,figureTitle)
% Compare descent methods: logarithmic histories and readable paths.
figure('Name',figureTitle,'Color','w','Position',[80 80 1450 490])
methodColors = lines(numel(labels));
multiMethod = numel(labels) > 1;

subplot(1,3,1); hold on
for k = 1:numel(labels)
    semilogy(max(results{k}.crit(:),eps),'Color',methodColors(k,:),'LineWidth',1.2)
end
set(gca,'YScale','log','FontSize',11)
if multiMethod, set(gca,'XScale','log'); end
xlabel('Iteration'); ylabel('Objective f(x_k)'); title('Objective (log scale)')
grid on; legend(cellstr(labels),'Location','best')

subplot(1,3,2)
contour(x1Grid,x2Grid,logObjective,24,'LineColor',[0.75 0.75 0.75]); hold on
for k = 1:numel(labels)
    path = iterates{k};
    plot(path(1,:),path(2,:),'-','Color',methodColors(k,:),'LineWidth',1.2)
    plot(path(1,1),path(2,1),'o','Color',methodColors(k,:),'MarkerSize',4)
end
plot(1,1,'kp','MarkerFaceColor','k','MarkerSize',10,'LineWidth',1.1)
xlabel('x_1'); ylabel('x_2'); title('Paths (star = minimum)')
grid on; set(gca,'FontSize',11)

subplot(1,3,3); hold on
for k = 1:numel(labels)
    semilogy(max(results{k}.grad(:),eps),'Color',methodColors(k,:),'LineWidth',1.2)
end
set(gca,'YScale','log','FontSize',11)
if multiMethod, set(gca,'XScale','log'); end
xlabel('Iteration'); ylabel('||grad f(x_k)||'); title('Gradient norms (log scale)')
grid on
end
