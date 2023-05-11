function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const result = { position, delay };
      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const delay = parseInt(form.elements['delay'].value);
  const step = parseInt(form.elements['step'].value);
  const amount = parseInt(form.elements['amount'].value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const promise = createPromise(position, delay + i * step);
    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
