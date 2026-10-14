function [objectiveValue,gradientVector,hessianMatrix] = compoundcriterion(signalEstimate,params)

measurementMatrix = params.measurementMatrix;
differenceMatrix = params.differenceMatrix;
noisySignal = params.noisySignal;
lambda = params.lambda;

measurementResidual = noisySignal-measurementMatrix*signalEstimate;
smoothnessResidual = differenceMatrix*signalEstimate;

objectiveValue = ...
    (1-lambda)*(measurementResidual'*measurementResidual) ...
    + lambda*(smoothnessResidual'*smoothnessResidual);

gradientVector = ...
    2*(1-lambda)*measurementMatrix'*(measurementMatrix*signalEstimate-noisySignal) ...
    + 2*lambda*(differenceMatrix'*differenceMatrix)*signalEstimate;

hessianMatrix = ...
    2*(1-lambda)*(measurementMatrix'*measurementMatrix) ...
    + 2*lambda*(differenceMatrix'*differenceMatrix);

end
