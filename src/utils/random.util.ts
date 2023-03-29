
interface CodeOptionsI {
    lowercase?: string | boolean,
    uppercase?: string | boolean,
    numbers?: string | boolean,
    symbols?: string | boolean
}

const codeOptions: CodeOptionsI = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*_-+='
}

export const getRandomRange = (min: number, max: number): number => Math.round(Math.random() * (max - min) + min)

export const generateCode = (length: number = 6, options: CodeOptionsI = { lowercase: true, numbers: true }): string => {
    let code = '';

    const selectedOptions = Object.keys(options).reduce((acc, key) => {
        if(options[key] === true) acc.push(key)
        return acc
    }, [])
    
    
    for(let i = 0; i < length; i++) {
        const optionsRange = getRandomRange(0, selectedOptions.length - 1)
        const selectedOption = selectedOptions[optionsRange]
        const valueRange = getRandomRange(0, codeOptions[selectedOption].length - 1)
        code += codeOptions[selectedOption][valueRange]
    }

    return code;
}
