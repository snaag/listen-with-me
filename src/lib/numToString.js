export default function numToString(num) {
  const units = [
    {
      dividend: 10000,
      divisor: 1000,
      word: '천',
    },
    {
      dividend: 100000000,
      divisor: 10000,
      word: '만',
    },
    {
      dividend: 1000000000000,
      divisor: 100000000,
      word: '억',
    },
  ];

  if (num < 1000) return num;

  const { divisor, word } = units.filter(({ dividend }) => num < dividend)[0];
  return (num / divisor) % 1 > 0
    ? `${(num / divisor).toFixed(1)} ${word}`
    : `${num / divisor} ${word}`;

  // if(num < dividend[0])
  //     return (num/divisor[0]) % 1 > 0 ?
  //     `${(num/divisor[0]).toFixed(1)} 천` : `${num/divisor[0]} 천`

  // if(num < dividend[1])
  // return (num/divisor[1]) % 1 > 0 ?
  // `${(num/divisor[1]).toFixed(1)} 만` : `${num/divisor[1]} 만`

  // if(num < dividend[2])
  // return (num/divisor[2]) % 1 > 0 ?
  // `${(num/divisor[2]).toFixed(1)} 억` : `${num/divisor[2]} 억`
}
