function [objectiveValue,gradientVector,hessianMatrix,residualVector,jacobianMatrix] = rosenbrock(point,params)

dimension = params.n;
coefficient = params.b;

residualVector = zeros(2*(dimension-1),1);
jacobianMatrix = zeros(2*(dimension-1),dimension);

for index = 1:dimension-1
    residualVector(2*index-1) = sqrt(coefficient)*(point(index+1)-point(index)^2);
    residualVector(2*index) = 1-point(index);
    jacobianMatrix(2*index-1,index) = -2*sqrt(coefficient)*point(index);
    jacobianMatrix(2*index-1,index+1) = sqrt(coefficient);
    jacobianMatrix(2*index,index) = -1;
end

objectiveValue = residualVector'*residualVector;
gradientVector = 2*jacobianMatrix'*residualVector;
hessianMatrix = zeros(dimension);
hessianMatrix(1,1) = 12*coefficient*point(1)^2-4*coefficient*point(2)+2;
for index = 2:dimension-1
    hessianMatrix(index,index) = 2*coefficient+12*coefficient*point(index)^2-4*coefficient*point(index+1)+2;
end
hessianMatrix(dimension,dimension) = 2*coefficient;
for index = 1:dimension-1
    hessianMatrix(index,index+1) = -4*coefficient*point(index);
    hessianMatrix(index+1,index) = hessianMatrix(index,index+1);
end
end
