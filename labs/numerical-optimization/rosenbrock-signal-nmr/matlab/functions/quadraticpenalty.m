function [estimatedDistribution,result] = quadraticpenalty(measuredSignal,modelMatrix,initialDistribution,options)

% Quadratic exterior penalty with Newton intermediate solves.

measuredSignal = measuredSignal(:);
currentDistribution = initialDistribution(:);
penaltyParameter = options.penaltyInitial;
totalInnerIterations = 0;
stopCondition = "MaxOuterIter";

normalMatrix = modelMatrix'*modelMatrix;
normalRightHandSide = modelMatrix'*measuredSignal;
measurementEnergy = measuredSignal'*measuredSignal;
identityMatrix = eye(length(currentDistribution));
violationHistory = zeros(options.maxOuterIter,1);

startTime = tic;

for outerIteration = 1:options.maxOuterIter
    for innerIteration = 1:options.maxInnerIter
        negativePart = min(currentDistribution,0);
        activeConstraint = currentDistribution < 0;

        leastSquaresValue = ...
            currentDistribution'*normalMatrix*currentDistribution ...
            - 2*normalRightHandSide'*currentDistribution ...
            + measurementEnergy;
        objectiveValue = ...
            leastSquaresValue + penaltyParameter*(negativePart'*negativePart);

        gradientVector = ...
            2*(normalMatrix*currentDistribution-normalRightHandSide) ...
            + 2*penaltyParameter*negativePart;
        hessianMatrix = ...
            2*normalMatrix ...
            + 2*penaltyParameter*diag(activeConstraint) ...
            + 1e-10*identityMatrix;

        if norm(gradientVector) <= options.innerTolerance
            break
        end

        searchDirection = -hessianMatrix\gradientVector;
        stepLength = 1;
        trialDistribution = currentDistribution+stepLength*searchDirection;
        trialNegativePart = min(trialDistribution,0);
        trialLeastSquaresValue = ...
            trialDistribution'*normalMatrix*trialDistribution ...
            - 2*normalRightHandSide'*trialDistribution ...
            + measurementEnergy;
        trialValue = ...
            trialLeastSquaresValue ...
            + penaltyParameter*(trialNegativePart'*trialNegativePart);

        while trialValue > objectiveValue ...
                + options.armijoConst*stepLength*(gradientVector'*searchDirection) ...
                && stepLength > eps
            stepLength = options.backtrack*stepLength;
            trialDistribution = currentDistribution+stepLength*searchDirection;
            trialNegativePart = min(trialDistribution,0);
            trialLeastSquaresValue = ...
                trialDistribution'*normalMatrix*trialDistribution ...
                - 2*normalRightHandSide'*trialDistribution ...
                + measurementEnergy;
            trialValue = ...
                trialLeastSquaresValue ...
                + penaltyParameter*(trialNegativePart'*trialNegativePart);
        end

        currentDistribution = trialDistribution;
        totalInnerIterations = totalInnerIterations+1;
    end

    constraintViolation = norm(min(currentDistribution,0));
    violationHistory(outerIteration) = constraintViolation;
    fprintf('Penalty stage %d/%d: rho=%.1e, violation=%.3e\n', ...
        outerIteration,options.maxOuterIter,penaltyParameter,constraintViolation)
    if constraintViolation <= options.outerTolerance
        stopCondition = "ConstraintTolerance";
        break
    end
    if outerIteration < options.maxOuterIter
        penaltyParameter = penaltyParameter*options.penaltyGrowth;
    end
end

estimatedDistribution = max(currentDistribution,0);
reconstructedSignal = modelMatrix*estimatedDistribution;
finalResidual = reconstructedSignal-measuredSignal;

result.outerIter = outerIteration;
result.innerIter = totalInnerIterations;
result.criterion = finalResidual'*finalResidual;
result.constraintViolation = constraintViolation; % BEFORE projecting onto s >= 0
result.projectedViolation = norm(min(estimatedDistribution,0));
result.constraintTolerance = options.outerTolerance;
result.constraintConverged = constraintViolation <= options.outerTolerance;
result.penaltyParameter = penaltyParameter;
result.violationHistory = violationHistory(1:outerIteration);
result.reconstructedSignal = reconstructedSignal;
result.temp = toc(startTime);
result.time = result.temp;
result.stop = stopCondition;

if ~result.constraintConverged
    warning('MATSIP:PenaltyNotConverged', ...
        'Exterior penalty violation %.3e exceeds tolerance %.3e after %d outer stages.', ...
        result.constraintViolation,options.outerTolerance,outerIteration)
end
end
