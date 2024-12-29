interface IBaseColors {
    [key: string]: string | IBaseColors;
}

export interface IColors extends IBaseColors {
    purpleBackground: string;
    purpleBlack: string;
    pink: string;
    white: string;
    black: string;
    button: {
        second: string;
    };
}
