function x = simsignal(n,type)
switch type
    case 'ecg'
        Fs = 256;
        x = ecgsyn(Fs, 10+ceil(n/Fs));
        M = round(n/Fs);
        x = x(Fs/2+(1:M*Fs));
    case 'spectre'
        K = 10;
        x = simspec(n,K);
end
x = x(1:n);
end
