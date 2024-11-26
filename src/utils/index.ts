import {
    REGEX_EMAIL,
    REGEX_MASK_CPF_FINAL,
    REGEX_MASK_CPF_PONTO,
    REGEX_MASK_CPF_TRACO, REGEX_NAME_FULL, REGEX_ONLY_NUMBERS
} from "~/constants/regex.const.ts";

/**
 * Valida se uma string é um e-mail válido.
 *
 * **Regex:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
 *
 * **Detalhes:**
 * - `^`: Garante que a validação começa no início da string.
 * - `[^\s@]+`: Verifica uma sequência de um ou mais caracteres, excluindo espaços e o símbolo `@`.
 * - `@`: Exige que o símbolo `@` esteja presente.
 * - `[^\s@]+`: Exige outra sequência de caracteres (nome do domínio), novamente excluindo espaços e o símbolo `@`.
 * - `\.`: Exige um ponto literal (`.`).
 * - `[^\s@]+`: Exige mais uma sequência de caracteres após o ponto (o TLD, como `.com` ou `.org`).
 * - `$`: Garante que a validação termina no final da string.
 *
 * **Exemplos válidos:**
 * - `email@example.com`
 * - `user.name@domain.co.uk`
 *
 * **Exemplos inválidos:**
 * - `email@` (não tem domínio)
 * - `@example.com` (não tem parte antes do `@`)
 * - `email@domain.` (não tem TLD após o ponto)
 * - `email@domain,com` (vírgula em vez de ponto)
 *
 * @param {string} value - O e-mail a ser validado.
 * @returns {boolean} Retorna `true` se o e-mail for válido, caso contrário, `false`.
 */
export const validateEmail = (value: string): boolean => {
    const emailRegex = REGEX_EMAIL;
    return emailRegex.test(value)
}


export const isValidCPF = (cpf: string): boolean => {
    const onlyNumbers = clearCPF(cpf);

    if (onlyNumbers.length !== 11 || /^(\d)\1+$/.test(onlyNumbers)) return false;

    let sum = 0;
    let remainder;

    // Validação do primeiro dígito
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(onlyNumbers.charAt(i - 1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(onlyNumbers.charAt(9))) return false;

    // Validação do segundo dígito
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(onlyNumbers.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(onlyNumbers.charAt(10))) return false;

    return true;
}

export const formatCPF = (value: string) => {
    let onlyNumbers = clearCPF(value)

    return onlyNumbers
        .replace(REGEX_MASK_CPF_PONTO, '$1.$2')
        .replace(REGEX_MASK_CPF_PONTO, '$1.$2')
        .replace(REGEX_MASK_CPF_TRACO, '$1-$2')
        .replace(REGEX_MASK_CPF_FINAL, '$1');
}

export const clearCPF = (cpf: string): string => {
    return cpf.replace(REGEX_ONLY_NUMBERS, '');
}

export const validateName = (name: string) => {
    const nameRegex = REGEX_NAME_FULL
    return nameRegex.test(name)
}

export const gerarId = (): string => {
    const randomId =  Math.floor(Math.random() * (10 - 50 + 1)) + 50;
    return randomId.toString()
}