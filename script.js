const rightInput = document.querySelector('input.right');
const leftInput  = document.querySelector('input.left' );
const detailsL   = document.querySelector('p.details'  );
const detailsR   = document.querySelector('p.details'  );

let result = 0;

async function getRate(from, to) {
  try {
    // loadingStart();
    const response = await fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`);
    const data = await response.json();
    // loadingEnd();
    return data.rates[to];
  }
  catch (err) { console.log(err) }
}

async function calculate(e) {
  console.clear();
  console.log(e);
  const leftSel  = document.querySelector('.leftSelect');
  const rightSel = document.querySelector('.rightSelect');
  const from = leftSel.options[leftSel.selectedIndex].value;
  const to = rightSel.options[rightSel.selectedIndex].value;
  if( to === from ) { rate = 1 } 
  const start = +parseInt(e.target.value) || 0;
  // if (e.target.classList.contains('leftButton' )) { from = e.target.value;  }
  // if (e.target.classList.contains('rightButton')) { to = e.target.value; }
  console.log('sent to parser');
  console.log(start);
  console.log(from);
  console.log(to);
  const rate = await getRate(from,to);
  const end = rate * +parseInt(start);
  console.log(end);
  result = end.toFixed(2);
  render(e);
}

const button = (e) => { 
  console.log(e.target);
  console.log(e.target.value);
  if (e.target.classList.contains('leftButton' )) { document.querySelector('leftSelect').value = e.target.value;  }
  if (e.target.classList.contains('rightButton')) { document.querySelector('rightSelect').value = e.target.value; }
  console.log('button'); 
  calculate();
}

const render = (e) => {
  console.log(e.target);
  if (e.target === rightInput) leftInput.value = result;
  if (e.target === leftInput) rightInput.value = result;
  const target = e.target; 
}

const loadingStart = () => { 
  document.body.style.background = 'grey'; 
  document.body.zIndex = 2;
  console.log('loading');
}
const loadingEnd = () => { 
  document.body.style.background = ' '; 
  document.body.zIndex = -1;
  console.log('loading end');
}

const reverse = () => {
  const valueL = leftInput.value;
  const valueR = rightInput.value;
  leftInput.value = valueR;
  rightInput.value = valueL;
}

// Get value from inputs
document.querySelectorAll('.cur').forEach(x => { x.addEventListener('input', calculate); })
document.querySelectorAll('select').forEach(x => { x.addEventListener('change', calculate); })
document.querySelector('.reverse').addEventListener('click', reverse);
document.querySelectorAll('input[type="button"]').forEach( x => { x.addEventListener('click', button )});
