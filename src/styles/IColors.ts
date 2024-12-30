interface IBaseColors {
    [key: string]: string | IBaseColors;
}

export interface IColors extends IBaseColors {
    purpleBackground: string;
    purpleBlack: string;
    pink: string;
    white: string;
    black: string;

    textBlack: string,
    textGray: string;
    gray: string;
    grayCartBorder: string;
    input: {
        borderColor: string;
        placeholderColor: string;
    },
    button: {
        second: string;
        buttonGreen: string;
        buttonDisable: string;
        buttonError: string;
    },
}
