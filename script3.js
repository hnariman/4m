const left = document.querySelector('input.right');
const right = document.querySelector('input.left');
let amount = 1;
let from = 'RUB';
let to = 'USD';

// парсим курс с сервиса
async function getRate(from, to) {
  console.log('from ',from);
  console.log('to :',to);
    loadingStart();
  try {
    const response = await fetch(`https://api.ratesapi.io/api/latest?base=${from}&symbols=${to}`);
    const data = await response.json();
    await setTimeout( function() { loadingEnd() }, 1000);
    return data.rates[to];
  }
  catch (err) { console.log(err) }
}

// конверторно-иверторный мега калькулятор
async function converter (from, to, amount, display) {
  console.log(from);
  // amount = (direction === 'left') 
  //   ? document.querySelector('input.left').value
  //   : document.querySelector('input.right').value
  amount =  document.querySelector('input.left').value
  const rate = await getRate(from, to);
  const result = (rate>0)? amount * rate : amount / rate;
  console.log(rate);
  console.log(amount);
  console.log(result);
  console.log('amount inside converter',amount);
  render(result, from, to, rate, display, event);
}

// кидаем инфу в HTML
const render = (result, from, to, rate, display, event) => {
  console.log('result inside render',result);

  console.log(from);
  console.log(to);

  display.value = result.toFixed(2);
  if (display == 'left' && event.target.tagName == 'BUTTON'){
    document.querySelector('.detailsL'   ).innerText = `1 ${from} = ${rate} ${to}`;
    document.querySelector('.detailsR'   ).innerText = `1 ${to} = ${(1/rate).toFixed(4)} ${from}`;
  } 
  else if (event.target.classList.contains('.right') && event.target.tagName == 'BUTTON') {
    document.querySelector('.detailsL'  ).innerText = `1 ${to} = ${rate} ${from}`;
    document.querySelector('.detailsR'  ).innerText = `1 ${from} = ${1/rate.toFixed(4)} ${to}`;
  }

}

// подсвечиваем кнопки 
const buttonStyle = (direction, target) => {
  document.querySelectorAll(`button.${direction}`)
    .forEach(x => x.classList.remove('selected'));
  target.classList.add('selected');
}

// function validate(data) {
//   console.log(data);
//   const pattern = /[^0-9]/
//   const newData = data.replace(pattern, '') ; 
//   console.log(newData);
// return newData;
// }

// запрос-о-накопитель, распределитель, слушатель
function handler(event, type) {
  const direction = (event.target.classList.contains('left')) ? 'left' : 'right';
  if (event.target.tagName === 'INPUT' ) { amount = event.target.value; const display = (direction === 'left') ? right : left; } 
  if (event.target.tagName === 'SELECT') { from   = event.target.options[event.target.selectedIndex].value; }
  if (event.target.tagName === 'BUTTON') { direction === 'left' ? from = event.target.value : to = event.target.value; buttonStyle(direction, event.target); }
  if (event.target.classList.contains('.left') && event.target.tagName == 'INPUT'){
  converter(from, to, amount, display);
}
}

function loadingStart() { 
  document.querySelector('.loader').style.display = 'block'; 
  document.querySelector('.loaderMessage').innerText = 'Loading';
  setTimeout( function() { document.querySelector('.loaderMessage').innerText = 'Loading.'; }, 250 )
  setTimeout( function() { document.querySelector('.loaderMessage').innerText = 'Loading..'; }, 500 )
  setTimeout( function() { document.querySelector('.loaderMessage').innerText = 'Loading...'; }, 750 )
}

function loadingEnd() { document.querySelector('.loader').style.display = 'none'; }

const reverse = () => {
  const valueL = document.querySelector('input.left').value;
  const valueR = document.querySelector('input.right').value;
  // const buttonR = document.querySelector('.left');
  // const buttonL = document.querySelector('input.right');
  console.log(document.querySelector('button.left ').value);
  console.log(document.querySelector('button.right ').value);

  // target.classList.add('selected');
  document.querySelector('input.left').value = valueR;
  document.querySelector('input.right').value = valueL;
}

document.querySelectorAll('button').forEach( x => x.addEventListener('click', handler));
document.querySelectorAll('select').forEach( x => x.addEventListener('change', handler));
document.querySelectorAll('input.cur').forEach( x => x.addEventListener('input', handler));
document.querySelector('.reverse').addEventListener('click', reverse);

document.querySelector('input.right').value = converter('RUB','USD',1, right);
