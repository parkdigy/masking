/********************************************************************************************************************
 * 이름 마스킹
 * ******************************************************************************************************************/
export function maskingName(v: string) {
  const value = v.trim();
  if (value === '') return v;

  if (value.length === 4 && value[1] === ' ') {
    return `${value[0]} *${value[3]}`;
  }

  const values = value.split(' ');
  const finalValues: string[] = [];
  for (const namePart of values) {
    finalValues.push(
      namePart.length === 1
        ? '*'
        : namePart.length === 2
          ? `${namePart[0]}*`
          : `${namePart[0]}${'*'.repeat(namePart.length - 2)}${namePart[namePart.length - 1]}`
    );
  }
  return finalValues.join(' ');
}

export default maskingName;
