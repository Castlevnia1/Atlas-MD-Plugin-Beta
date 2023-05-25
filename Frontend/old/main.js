const mainQrPlaceholder = document.querySelector('.main-qr-placeholder');
const mainQr = document.querySelector('.main-qr');

mainQrPlaceholder.style.display = 'block';
mainQr.style.display = 'none';

mainQr.addEventListener('load', () => {
  mainQrPlaceholder.style.display = 'none';
  mainQr.style.display = 'block';
});
