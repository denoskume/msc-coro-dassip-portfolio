function [objectiveValue,gradientVector,hessianMatrix] = nmrobjective(distributionValues,params)

% NMR least-squares objective, gradient and Hessian.

modelMatrix = params.modelMatrix;
measuredSignal = params.measuredSignal(:);
distributionValues = distributionValues(:);

residualVector = modelMatrix*distributionValues-measuredSignal;

objectiveValue = residualVector'*residualVector;
gradientVector = 2*modelMatrix'*residualVector;
hessianMatrix = 2*(modelMatrix'*modelMatrix);

end
