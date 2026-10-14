%% MATSIP — Numerical Optimization | Final MATLAB Lab
% Exercise 1: Rosenbrock | Exercise 3: Signal enhancement
% Exercise 4, Q1: NMR exterior penalty (Newton intermediate solves).
% Full original: final_report_full_original.m. Export: publish('final_report.m','pdf')
clear; clc; close all
root = fileparts(mfilename('fullpath'));
addpath(fullfile(root,'functions'),'-begin')

%% Exercise 1.1 — Rosenbrock: gradient, Hessian and global minimum
% f(x1,x2)=b(x2-x1^2)^2+(1-x1)^2, minimum at (1,1).
parameters = struct('n',2,'b',2);
[fStar,gStar,hStar] = rosenbrock([1;1],parameters);
fprintf('Rosenbrock minimum: f=%.2e, ||grad||=%.2e\n',fStar,norm(gStar))
disp('Hessian at x* = [1;1]'); disp(hStar)

%% Exercise 1.2 — 3-D surface and 2-D contours
x1 = -4:0.05:4; x2 = -5:0.05:20;
[X1,X2] = meshgrid(x1,x2);
logCriterion = log1p(parameters.b*(X2-X1.^2).^2+(1-X1).^2);
figure('Name','Rosenbrock surface','Color','w')
rosenbrockLayout = tiledlayout(1,2,'TileSpacing','loose','Padding','loose');
nexttile(rosenbrockLayout); meshc(x1,x2,logCriterion); grid on
xlabel('x_1'); ylabel('x_2'); zlabel('log(1+f)'); title('Rosenbrock surface')
nexttile(rosenbrockLayout); contour(x1,x2,logCriterion,32,'LineColor',[0.65 0.65 0.65]); hold on
plot(1,1,'kp','MarkerSize',10,'LineWidth',2)
xlabel('x_1'); ylabel('x_2'); title('Level sets'); grid on

%% Exercise 1.3.1–1.3.2 — Fixed step and Armijo backtracking
options = struct('MaxIter',1000,'TolG',1e-8,'TolX',1e-8,'TolF',1e-8, ...
    'beta',0.75,'const',1e-3,'lambda',1e-2,'method',"gradient");
fixedSteps = [1 0.1 0.01 0.001];
fixedResults = cell(4,1); fixedPaths = cell(4,1);
for k = 1:4
    trial = options; trial.step = "fixed"; trial.alpha = fixedSteps(k);
    [~,fixedResults{k},fixedPaths{k}] = optimdescent(@rosenbrock,parameters,trial,[-2;1]);
end
fixedLabels = "alpha=" + string(fixedSteps(:));
fixedLabels(1) = "alpha=1 (oscillatory)"; % An intentionally large fixed step
plot_descent_summary(x1,x2,logCriterion,fixedResults,fixedPaths,fixedLabels,'Fixed steps')
trial = options; trial.step = "variable";
[armijoPoint,armijoResult,armijoPath] = optimdescent(@rosenbrock,parameters,trial,[-2;1]);
fprintf('Armijo: x=[%.5f, %.5f], f=%.2e, iterations=%d\n', ...
    armijoPoint,armijoResult.crit(end),armijoResult.iter)
plot_descent_summary(x1,x2,logCriterion,{armijoResult},{armijoPath},"Armijo",'Armijo')

%% Exercise 1.3.3–1.3.6 — Gradient, FR, Newton, BFGS, GN and LM
methodNames = ["gradient";"Fletcher-Reeves";"Newton";"Quasi-Newton"; ...
               "Gauss-Newton";"Levenberg-Marquardt"];
methodLabels = ["Gradient";"Fletcher-Reeves";"Newton";"BFGS"; ...
                "Gauss-Newton";"Levenberg-Marquardt"];
startingPoints = [-2 -3;1 5];
for startIndex = 1:size(startingPoints,2)
    startPoint = startingPoints(:,startIndex);
    methodResults = cell(6,1); methodPaths = cell(6,1);
    finalPoints = zeros(2,6);
    for k = 1:6
        trial = options; trial.step = "variable"; trial.method = methodNames(k);
        [finalPoints(:,k),methodResults{k},methodPaths{k}] = ...
            optimdescent(@rosenbrock,parameters,trial,startPoint);
    end
    plot_descent_summary(x1,x2,logCriterion,methodResults(1:4), ...
        methodPaths(1:4),methodLabels(1:4),'Gradient / FR / Newton / BFGS')
    plot_descent_summary(x1,x2,logCriterion,methodResults,methodPaths, ...
        methodLabels,'Six-method comparison')
    objective = cellfun(@(r) r.crit(end),methodResults);
    gradientNorm = cellfun(@(r) r.grad(end),methodResults);
    iterations = cellfun(@(r) r.iter,methodResults);
    seconds = cellfun(@(r) r.temp,methodResults);
    stops = string(cellfun(@(r) char(r.stop),methodResults,'UniformOutput',false));
    summary = table(methodLabels,finalPoints(1,:)',finalPoints(2,:)', ...
        objective,gradientNorm,iterations,seconds,stops, ...
        'VariableNames',{'Method','x1','x2','Objective','GradientNorm', ...
        'Iterations','Seconds','Stop'});
    fprintf('\nMethods compared from x0=[%g;%g]\n',startPoint); disp(summary)
end
% First order: gradient / FR. Exact Hessian: Newton.
% BFGS approximates curvature; GN/LM exploit nonlinear least squares.

%% Exercise 3.1 — Simulate noisy signal at SNR = 20 dB
numberOfSamples = 1000; signalType = 'spectre';
rng(0)
cleanSignal = simsignal(numberOfSamples,signalType); cleanSignal = cleanSignal(:);
signalEnergy = mean(cleanSignal.^2);
noiseVariance = signalEnergy / 10^(20/10);
noisySignal = cleanSignal + sqrt(noiseVariance)*randn(numberOfSamples,1);
fprintf('Signal energy=%.6f; noise variance=%.6f\n',signalEnergy,noiseVariance)
figure; plot(cleanSignal,'LineWidth',1.4); hold on
plot(noisySignal,'LineWidth',0.7); title('Original and noisy signal')
xlabel('Sample'); ylabel('Amplitude'); legend('Original','Noisy'); grid on

%% Exercise 3.2 — Least squares, Tikhonov smoothing and iterative Newton
% H=I gives ordinary least-squares x=y (no denoising).
% D is the first-difference matrix: its nullspace contains constants.
identityMatrix = speye(numberOfSamples);
differenceMatrix = diff(identityMatrix,1,1);
lambda = 0.20;
systemMatrix = (1-lambda)*identityMatrix+lambda*(differenceMatrix'*differenceMatrix);
closedEstimate = systemMatrix\((1-lambda)*noisySignal);
criterionParams = struct('measurementMatrix',identityMatrix, ...
    'differenceMatrix',differenceMatrix,'noisySignal',noisySignal,'lambda',lambda);
trial = options; trial.method = "Newton"; trial.step = "variable"; trial.MaxIter = 100;
[iterativeEstimate,signalResult] = ...
    optimdescent(@compoundcriterion,criterionParams,trial,noisySignal);
fprintf('Signal: closed-form / iterative difference = %.3e (%d iterations)\n', ...
    norm(iterativeEstimate-closedEstimate),signalResult.iter)
figure; plot(cleanSignal); hold on; plot(noisySignal)
plot(iterativeEstimate,'LineWidth',1.4); grid on
xlabel('Sample'); ylabel('Amplitude'); title('Enhanced signal, lambda=0.20')
legend('Original','Noisy','Enhanced')

%% Exercise 3.3 — Sweep lambda, estimation error and fidelity/smoothness
lambdaValues = linspace(0.001,0.999,100);
estimationError = zeros(100,1); fidelity = estimationError; smoothness = estimationError;
for k = 1:numel(lambdaValues)
    weight = lambdaValues(k);
    candidate = ((1-weight)*identityMatrix+weight*(differenceMatrix'*differenceMatrix)) ...
        \((1-weight)*noisySignal);
    estimationError(k) = norm(candidate-cleanSignal);
    fidelity(k) = norm(noisySignal-candidate)^2;
    smoothness(k) = norm(differenceMatrix*candidate)^2;
end
[bestError,bestIndex] = min(estimationError);
fprintf('Best lambda=%.4f, estimation error=%.4f\n',lambdaValues(bestIndex),bestError)
figure('Name','Regularization choice','Color','w')
regularizationLayout = tiledlayout(1,2,'TileSpacing','loose','Padding','loose');
nexttile(regularizationLayout); plot(lambdaValues,estimationError); hold on
plot(lambdaValues(bestIndex),bestError,'kp','MarkerSize',9)
xlabel('lambda'); ylabel('||xhat-x||_2'); title('Estimation error'); grid on
nexttile(regularizationLayout); loglog(fidelity,smoothness); hold on
loglog(fidelity(bestIndex),smoothness(bestIndex),'kp','MarkerSize',9)
xlabel('Data fidelity'); ylabel('Smoothness'); title('Regularization trade-off'); grid on

%% Exercise 4, Q1 — NMR quadratic exterior penalty
% min ||y-Ks||^2 subject to s>=0; penalty rho*||min(s,0)||^2.
numberOfRelaxationTimes = 200;
measurementTimes = linspace(0,10,5000)';
relaxationTimes = (1:numberOfRelaxationTimes)'*(10/4)/numberOfRelaxationTimes;
relaxationStd = (10/4)/30; relaxationMean = (10/4)/4;
trueDistribution = exp(-((relaxationTimes-relaxationMean)/relaxationStd).^2);
modelMatrix = simrelax(relaxationTimes,measurementTimes,'T2');
cleanMeasurement = modelMatrix*trueDistribution;
rng(1)
observations = cleanMeasurement+(max(cleanMeasurement)/100)*randn(size(cleanMeasurement));
nmrParams = struct('modelMatrix',modelMatrix,'measuredSignal',observations);
[nmrValue,nmrGradient,nmrHessian] = nmrobjective(trueDistribution,nmrParams);
fprintf('NMR f(s)=%.3e, ||gradient||=%.3e, Hessian=%dx%d\n', ...
    nmrValue,norm(nmrGradient),size(nmrHessian))
penaltyOptions = struct('penaltyInitial',1,'penaltyGrowth',10, ...
    'outerTolerance',1e-6,'innerTolerance',1e-8, ...
    'maxOuterIter',10,'maxInnerIter',150,'armijoConst',1e-4,'backtrack',0.5);
[estimatedDistribution,nmrResult] = quadraticpenalty( ...
    observations,modelMatrix,zeros(numberOfRelaxationTimes,1),penaltyOptions);
fprintf('Synthetic NMR: objective=%.3e, violation=%.3e, converged=%d\n', ...
    nmrResult.criterion,nmrResult.constraintViolation,nmrResult.constraintConverged)
assert(nmrResult.constraintConverged,'Synthetic NMR penalty did not converge.')
% Nonnegativity alone does not stabilize this ill-conditioned inverse problem.
distributionError = norm(estimatedDistribution-trueDistribution)/norm(trueDistribution);
syntheticFitError = norm(nmrResult.reconstructedSignal-observations)/norm(observations);
fprintf('Synthetic NMR: distribution rel. error=%.3f, signal fit rel. error=%.3e\n', ...
    distributionError,syntheticFitError)
figure('Name','Synthetic NMR','Color','w')
syntheticLayout = tiledlayout(1,2,'TileSpacing','loose','Padding','loose');
nexttile(syntheticLayout); plot(relaxationTimes,trueDistribution,'k'); hold on
plot(relaxationTimes,estimatedDistribution); title('Synthetic distribution (no smoothing)')
xlabel('Relaxation time'); legend('True','Penalty'); grid on
nexttile(syntheticLayout); plot(measurementTimes,observations,'k'); hold on
plot(measurementTimes,nmrResult.reconstructedSignal)
title('Synthetic NMR fit'); xlabel('Measurement time'); grid on
legend('Observed','Reconstructed','Location','best')

%% Exercise 4, Q1 — Real NMR data validation
dataFile = fullfile(root,'data','NMRdataMeasures.mat');
if isfile(dataFile)
    measurements = load(dataFile);
    times = measurements.time(:); observed = measurements.y(:);
    relaxationGrid = (1:numberOfRelaxationTimes)'*(max(times)/4)/numberOfRelaxationTimes;
    kernel = simrelax(relaxationGrid,times,char(measurements.mode));
    [estimate,measuredResult] = quadraticpenalty( ...
        observed,kernel,zeros(numberOfRelaxationTimes,1),penaltyOptions);
    fprintf('Measured NMR: objective=%.3e, violation=%.3e, converged=%d\n', ...
        measuredResult.criterion,measuredResult.constraintViolation, ...
        measuredResult.constraintConverged)
    assert(measuredResult.constraintConverged, ...
        'Measured NMR exterior penalty did not meet the 1e-6 constraint tolerance.')
    measuredFitError = norm(measuredResult.reconstructedSignal-observed)/norm(observed);
    fprintf('Measured NMR signal fit relative error=%.3e\n',measuredFitError)
    % A small signal residual does not prove that the recovered distribution is unique.
    figure('Name','Measured NMR','Color','w')
    measuredLayout = tiledlayout(1,2,'TileSpacing','loose','Padding','loose');
    nexttile(measuredLayout); plot(relaxationGrid,estimate); grid on
    title('Measured distribution (no smoothing)'); xlabel('Relaxation time')
    nexttile(measuredLayout); plot(times,observed,'k'); hold on
    plot(times,measuredResult.reconstructedSignal); grid on
    title('Measured signal fit'); xlabel('Measurement time')
    legend('Observed','Reconstructed','Location','best')
else
    warning('Missing original data/NMRdataMeasures.mat')
end

%% Final interpretation
% Gradient methods: low per-step cost, potential slow convergence.
% Newton / GN / LM: curvature information; BFGS: approximate curvature.
% Signal denoising: lambda balances fidelity against smoothness.
% NMR exterior penalty: increasing rho discourages negative distributions.
