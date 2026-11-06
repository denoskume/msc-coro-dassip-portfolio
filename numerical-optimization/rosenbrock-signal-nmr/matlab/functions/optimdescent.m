function [finalPoint,result,iterateHistory] = optimdescent(critfun,params,options,initialPoint)

currentPoint = initialPoint(:);
inverseHessianApproximation = eye(length(currentPoint));
objectiveHistory = [];
gradientNormHistory = [];
iterateHistory = [];
stopCondition = "MaxIter";
functionOutputCount = nargout(critfun);
startTime = tic;

for iteration = 1:options.MaxIter
    if functionOutputCount >= 5
        [objectiveValue,gradientVector,hessianMatrix,residualVector,jacobianMatrix] = critfun(currentPoint,params);
    elseif functionOutputCount >= 4
        [objectiveValue,gradientVector,hessianMatrix,jacobianMatrix] = critfun(currentPoint,params);
        residualVector = [];
    else
        [objectiveValue,gradientVector,hessianMatrix] = critfun(currentPoint,params);
        residualVector = [];
        jacobianMatrix = [];
    end

    gradientNorm = norm(gradientVector);
    objectiveHistory(end+1,1) = objectiveValue;
    gradientNormHistory(end+1,1) = gradientNorm;
    iterateHistory(:,end+1) = currentPoint;

    if gradientNorm <= options.TolG
        stopCondition = "TolG";
        break
    end

    if iteration > 1
        relativePointChange = norm(currentPoint-previousPoint)/max(norm(previousPoint),eps);
        relativeObjectiveChange = abs(objectiveValue-previousObjective)/max(abs(previousObjective),eps);
        if relativePointChange <= options.TolX
            stopCondition = "TolX";
            break
        end
        if relativeObjectiveChange <= options.TolF
            stopCondition = "TolF";
            break
        end
    end

    if iteration == options.MaxIter
        stopCondition = "MaxIter";
        break
    end

    switch string(options.method)
        case "gradient"
            searchDirection = -gradientVector/gradientNorm;

        case {"conjugate-gradient","Fletcher-Reeves"}
            if iteration == 1
                searchDirection = -gradientVector;
            else
                fletcherReevesCoefficient = ...
                    (gradientVector'*gradientVector) ...
                    /(previousGradientVector'*previousGradientVector);
                searchDirection = ...
                    -gradientVector ...
                    + fletcherReevesCoefficient*previousSearchDirection;

                % With an inexact line search, Fletcher-Reeves can lose the
                % descent property. Restart with steepest descent whenever
                % g_k^T d_k is non-negative so Armijo receives a valid
                % descent direction instead of shrinking the step to zero.
                if gradientVector'*searchDirection >= 0
                    searchDirection = -gradientVector;
                end
            end

        case "Newton"
            searchDirection = -hessianMatrix\gradientVector;

        case {"BFGS","Quasi-Newton"}
            if iteration > 1
                pointDifference = currentPoint-previousPoint;
                gradientDifference = gradientVector-previousGradientVector;
                curvatureValue = gradientDifference'*pointDifference;
                if curvatureValue > eps
                    updateCoefficient = 1/curvatureValue;
                    identityMatrix = eye(length(currentPoint));
                    inverseHessianApproximation = ...
                        (identityMatrix-updateCoefficient*pointDifference*gradientDifference') ...
                        * inverseHessianApproximation ...
                        * (identityMatrix-updateCoefficient*gradientDifference*pointDifference') ...
                        + updateCoefficient*(pointDifference*pointDifference');
                end
            end
            searchDirection = -inverseHessianApproximation*gradientVector;

        case "Gauss-Newton"
            if isempty(jacobianMatrix)
                error('Gauss-Newton requires a residual Jacobian.')
            end
            normalMatrix = jacobianMatrix'*jacobianMatrix;
            if isempty(residualVector)
                normalGradient = gradientVector;
            else
                normalGradient = jacobianMatrix'*residualVector;
            end
            searchDirection = -normalMatrix\normalGradient;

        case "Levenberg-Marquardt"
            if isempty(jacobianMatrix)
                error('Levenberg-Marquardt requires a residual Jacobian.')
            end
            normalMatrix = jacobianMatrix'*jacobianMatrix;
            if isempty(residualVector)
                normalGradient = gradientVector;
            else
                normalGradient = jacobianMatrix'*residualVector;
            end
            dampingMatrix = options.lambda*eye(length(currentPoint));
            searchDirection = -(normalMatrix+dampingMatrix)\normalGradient;

        otherwise
            error('Unknown descent method: %s',options.method)
    end

    switch string(options.step)
        case "fixed"
            stepLength = options.alpha;

        case "variable"
            stepLength = 1;
            trialValue = critfun(currentPoint+stepLength*searchDirection,params);
            while trialValue > objectiveValue ...
                    + options.const*stepLength*(gradientVector'*searchDirection) ...
                    && stepLength > eps
                stepLength = options.beta*stepLength;
                trialValue = critfun(currentPoint+stepLength*searchDirection,params);
            end

        otherwise
            error('Unknown step strategy: %s',options.step)
    end

    previousPoint = currentPoint;
    previousObjective = objectiveValue;
    previousGradientVector = gradientVector;
    previousSearchDirection = searchDirection;
    currentPoint = currentPoint + stepLength*searchDirection;
end

finalPoint = currentPoint;
computingTime = toc(startTime);
result.iter = iteration;
result.crit = objectiveHistory;
result.grad = gradientNormHistory;
result.temp = computingTime;
result.time = computingTime;
result.stop = stopCondition;
end
