import numeral from 'numeral'

const dollarFilter = value => {
  if (!value) {
    return '$ 0'
  } else {
    return numeral(value).format('($ 0.00a)')
  }
  // !value ? '$ 0' : numeral(value).format('($ 0.00a)')
}

const percentFilter = value => {
  if(!value) {
    return '0%'
  } else {
    return `${Number(value).toFixed(2)}%`
  }
}


export { dollarFilter, percentFilter }