document.addEventListener('DOMContentLoaded', function() {
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const toggleContrastBtn = document.getElementById('toggle-contrast');

    increaseFontBtn.addEventListener('click', function() {
        document.body.classList.add('larger-font');
    });

    decreaseFontBtn.addEventListener('click', function() {
        document.body.classList.remove('larger-font');
    });

    toggleContrastBtn.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fetch('YOUR_CLOUD_FUNCTION_URL', { // Замените на URL вашей Cloud Function
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('form-result').textContent = data.result; // Выводим сообщение от сервера
        form.reset(); // Очищаем форму
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById('form-result').textContent = 'Произошла ошибка при отправке сообщения.';
    });
});



    /**
 * Обработчик HTTP-запросов для отправки email.
 *
 * @param {Object} req Объект запроса HTTP.
 * @param {Object} res Объект ответа HTTP.
 */
exports.sendEmail = async (req, res) => {
    // CORS
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'POST');
  
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.status(204).send('');
    } else {
      try {
        const { name, email, message } = req.body;
  
        // Настройка Nodemailer
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail', // или другой почтовый сервис
          auth: {
            user: 'your-gmail@gmail.com', // Ваш email
            pass: 'your-gmail-password'   // Ваш пароль или App Password
          }
        });
  
        const mailOptions = {
          from: 'your-gmail@gmail.com',
          to: 'your-recipient@example.com', // Кому отправлять
          subject: 'Сообщение с сайта IntelligentPC',
          text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
        };
  
        // Отправка письма
        await transporter.sendMail(mailOptions);
  
        res.status(200).json({ result: 'Спасибо! Ваше сообщение отправлено.' });
  
      } catch (error) {
        console.error('Ошибка отправки email:', error);
        res.status(500).json({ result: 'Произошла ошибка при отправке сообщения.' });
      }
    }
  };



  document.getElementById('configurator-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Здесь будет логика расчета стоимости и отображения результата
    const cpu = document.getElementById('cpu').value;
    const gpu = document.getElementById('gpu').value;
    const ram = document.getElementById('ram').value;
    const storage = document.getElementById('storage').value;

    //  Пример расчета (нужно адаптировать под вашу систему ценообразования)
    let totalPrice = 0;
    if (cpu === 'intel-i5') totalPrice += 20000;
    if (cpu === 'intel-i7') totalPrice += 30000;
    if (cpu === 'amd-ryzen5') totalPrice += 18000;
    if (cpu === 'amd-ryzen7') totalPrice += 28000;

    if (gpu === 'rtx-3060') totalPrice += 35000;
    if (gpu === 'rtx-3070') totalPrice += 50000;
    if (gpu === 'rx-6700xt') totalPrice += 40000;
    if (gpu === 'rx-6800xt') totalPrice += 55000;

    if (ram === '16gb') totalPrice += 8000;
    if (ram === '32gb') totalPrice += 15000;
    if (ram === '64gb') totalPrice += 25000;

    if (storage === '500gb-ssd') totalPrice += 5000;
    if (storage === '1tb-ssd') totalPrice += 10000;
    if (storage === '2tb-ssd') totalPrice += 18000;

    document.getElementById('configurator-result').textContent = `Примерная стоимость: ${totalPrice} руб.`;
});




document.addEventListener('DOMContentLoaded', function() {
  // Получаем счетчик из localStorage
  let visitCount = localStorage.getItem('visitCount');

  // Если счетчика нет, устанавливаем значение 1
  if (!visitCount) {
      visitCount = 1;
  } else {
      // Если счетчик есть, увеличиваем его на 1
      visitCount = parseInt(visitCount) + 1;
  }

  // Сохраняем новое значение счетчика в localStorage
  localStorage.setItem('visitCount', visitCount);

  // Отображаем счетчик на странице
  document.getElementById('counter').textContent = 'Количество посещений (в этом браузере): ' + visitCount;
});ы

console.log('Конфигуратор загружен'); // Проверяем, выполняется ли код

        document.getElementById('configurator-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем отправку формы

            // Получаем выбранные значения и их цены
            const cpuPrice = parseInt(document.getElementById('cpu').value);
            const gpuPrice = parseInt(document.getElementById('gpu').value);
            const ramPrice = parseInt(document.getElementById('ram').value);
            const storagePrice = parseInt(document.getElementById('storage').value);

            // Рассчитываем общую стоимость
            const totalPrice = cpuPrice + gpuPrice + ramPrice + storagePrice;

            // Выводим результат
            document.getElementById('configurator-result').textContent = 'Итоговая стоимость: ' + totalPrice + ' руб.';
        });




           // JavaScript (app.js)
document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.product-card button');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productId = this.dataset.id;
          const productName = this.dataset.name;
          const productPrice = parseFloat(this.dataset.price);

          // Получаем текущие товары в корзине из localStorage
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

          // Добавляем новый товар в корзину
          cartItems.push({
              id: productId,
              name: productName,
              price: productPrice
          });

          // Сохраняем обновленные товары в корзине в localStorage
          localStorage.setItem('cartItems', JSON.stringify(cartItems));

          // Перенаправляем пользователя на страницу корзины
          window.location.href = 'cart.html';
      });
  });
});


// Accessibility functions
function toggleFontSize() {
  document.body.classList.toggle('larger-font');
  // Сохраняем состояние в localStorage
  localStorage.setItem('largerFontEnabled', document.body.classList.contains('larger-font'));
}

function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
  // Сохраняем состояние в localStorage
  localStorage.setItem('highContrastEnabled', document.body.classList.contains('high-contrast'));
}

// При загрузке страницы проверяем сохраненное состояние
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('largerFontEnabled') === 'true') {
    document.body.classList.add('larger-font');
  }

  if (localStorage.getItem('highContrastEnabled') === 'true') {
    document.body.classList.add('high-contrast');
  }
});
