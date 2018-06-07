import decamelize from 'decamelize';

const FREE = 0;
const DRAG = 1;
const SCALE = 2;
const ROTATE = 3;
const DRAW = 4;
const TYPE = 5;
const EDIT_OBJECT = 6;

export const MODES = {
    FREE,
    DRAG,
    SCALE,
    ROTATE,
    DRAW,
    TYPE,
    EDIT_OBJECT
};

export function JsonToCssStyle(style: any) {
    return Object.entries(style).reduce((styleString, [propName, propValue]) => {
        return `${styleString}${decamelize(propName, '-')}:${propValue};`;
    }, '');
}

export function JsonToAttributes(json: any) {
    let r = Object.entries(json).reduce((styleString, [propName, propValue]) => {
        return `${styleString}${propName}='${propValue}'\n`;
    }, '');
    return r;
}