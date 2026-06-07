const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Carregar HTML local
  const htmlPath = path.join(__dirname, 'roteiro-para-pdf.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

  // Gerar PDF com otimizações
  const pdfPath = path.join(__dirname, 'Roteiro-Memorial-Todas-as-Historias-do-Mundo-v5.pdf');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '0.8cm', right: '1cm', bottom: '0.8cm', left: '1cm' },
    scale: 0.95,
    preferCSSPageSize: true,
    printBackground: true,
    displayHeaderFooter: false,
  });

  console.log(`✅ PDF gerado: ${pdfPath}`);
  await browser.close();
})();
