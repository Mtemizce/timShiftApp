// frontend/modules/Reports/components/exportPrint.jsx
import { pdf } from '@react-pdf/renderer';
import PersonnelReportPDF from './PersonnelReportPDF';
import React from 'react';

export const exportToPrint = async (data, selectedColumns, columnLabels, customPageTitle, pageOptions) => {
  const doc = (
    <PersonnelReportPDF
      data={data}
      selectedColumns={selectedColumns}
      columnLabels={columnLabels}
      customPageTitle={customPageTitle}
      pageOptions={pageOptions}
    />
  );

  const blob = await pdf(doc).toBlob();
  const blobUrl = URL.createObjectURL(blob);

  const html = `
    <html>
      <head>
        <title>Yazdırılıyor...</title>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe id="pdf-frame" src="${blobUrl}"></iframe>
        <script>
          const iframe = document.getElementById('pdf-frame');
          iframe.onload = () => {
            setTimeout(() => {
              iframe.contentWindow.focus();
              iframe.contentWindow.print();

              const interval = setInterval(() => {
                if (document.hasFocus()) {
                  clearInterval(interval);
                  setTimeout(() => window.close(), 200);
                }
              }, 500);
            }, 500);
          };
        </script>
      </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.open();
  win.document.write(html);
  win.document.close();
};
