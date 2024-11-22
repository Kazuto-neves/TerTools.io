export const romanToIntMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export const intToRomanMap = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" },
];

export function romanToInt(roman) {
    roman = roman.toUpperCase();
    let total = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = romanToIntMap[roman[i]];
      const next = romanToIntMap[roman[i + 1]] || 0;
      if (current < next) {
        total += next - current;
        i++;
      } else {
        total += current;
      }
    }
    return total;
  }

export function intToRoman(num) {
  let result = "";
  for (const { value, symbol } of intToRomanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

export function autoConvert(input) {
  if (/^[IVXLCDM]+$/i.test(input)) {
    return romanToInt(input.toUpperCase());
  } else if (/^\d+$/.test(input)) {
    return intToRoman(parseInt(input, 10));
  } else {
    throw new Error(
      "Entrada inválida. Use um número inteiro ou número romano."
    );
  }
}
