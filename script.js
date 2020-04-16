const rightInput = document.querySelector('input.right');
const leftInput  = document.querySelector('input.left' );
const detailsL   = document.querySelector('p.details'  );
const detailsR   = document.querySelector('p.details'  );

let result = 0;

async function getRate(from, to) {
  try {
    const response = await fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`);
    const data = await response.json();
    loading();
    return data.rates[to];
  }
  catch (err) { console.log(err) }
}

async function calculate(e) {
  console.clear();
  // if( e === undefined ) e.target = document.querySelector('')
  const from = document.querySelector('.leftSelect').value;
  const to = document.querySelector('.rightSelect').value;
  console.log(document.querySelector('.leftSelect').value);
  console.log(document.querySelector('.rightSelect').value);
  const start = +parseInt(e.target.value) || 0;
  const rate = await getRate(from,to);
  const end = rate * +parseInt(start);
  result = end.toFixed(2);
  
  render(e);
}

// const button = (e) => { 
//   console.log(e.target);
//   console.log(e.target.value);
//   if (e.target.classList.contains('left' )) { document.querySelector('leftSelect').value = e.target.value;  }
//   if (e.target.classList.contains('right')) { document.querySelector('rightSelect').value = e.target.value; }
//   console.log('button'); 
//   calculate();
// }

const render = (e) => {
  console.log(e.target);
  if (e.target === rightInput) leftInput.value = result;
  if (e.target === leftInput) rightInput.value = result;
  const target = e.target; 
}

const loading = () => { console.log('loading'); }

const reverse = () => {
  const valueL = leftInput.value;
  const valueR = rightInput.value;
  leftInput.value = valueR;
  rightInput.value = valueL;
}

// Get value from inputs
document.querySelectorAll('.cur').forEach(x => { x.addEventListener('input', calculate); })
document.querySelectorAll('select').forEach(x => { x.addEventListener('change', calculate); })
// document.querySelectorAll('input[type="button"]').forEach( x => { x.addEventListener('click', button )});
document.querySelector('.reverse').addEventListener('click', reverse);
