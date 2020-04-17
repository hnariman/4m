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
async function converter (from, to, amount, direction) {
  const rate = await getRate(from, to);
  const result = amount * rate;
  console.log(rate);
  console.log(amount);
  console.log(result);
  render(result, direction, from, to, rate);
}

// кидаем инфу в HTML
const render = (result, direction, from, to, rate) => {
  console.log(direction);
  console.log(from);
  console.log(to);

  if (direction === 'left') {
    document.querySelector('input.right').value = result.toFixed(2)
    document.querySelector('.detailsL'   ).innerText = `1 ${from} = ${rate} ${to}`;
    document.querySelector('.detailsR'   ).innerText = `1 ${to} = ${(1/rate).toFixed(4)} ${from}`;
  } 
  else if (direction === 'right') {
    document.querySelector('.detailsL'  ).innerText = `1 ${to} = ${rate} ${from}`;
    document.querySelector('.detailsR'  ).innerText = `1 ${from} = ${1/rate} ${to}`;
    document.querySelector('input.left').value = result.toFixed(2)
  }
}

// подсвечиваем кнопки 
const buttonStyle = (direction, target) => {
  document.querySelectorAll(`button.${direction}`)
    .forEach(x => x.classList.remove('selected'));
  target.classList.add('selected');
}

// запрос-о-накопитель, распределитель, слушатель
function handler(event, type) {
  console.log(event.target);
  let from ='USD';
  let to = 'RUB';
  let amount = 1;
  const direction = (event.target.classList.contains('left')) ? 'left' : 'right';
  if (event.target.tagName === 'INPUT')  { amount = event.target.value; }
  if (event.target.tagName === 'SELECT') { from   = event.target.options[event.target.selectedIndex].value; }
  if (event.target.tagName === 'BUTTON') { from   = event.target.value; buttonStyle(direction, event.target); }

  converter(from, to, amount, direction);
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
  const valueL = leftInput.value;
  const valueR = rightInput.value;
  leftInput.value = valueR;
  rightInput.value = valueL;
}

document.querySelectorAll('button').forEach( x => x.addEventListener('click', handler));
document.querySelectorAll('select').forEach( x => x.addEventListener('change', handler));
document.querySelectorAll('input.cur').forEach( x => x.addEventListener('input', handler));
document.querySelector('.reverse').addEventListener('click', reverse);
