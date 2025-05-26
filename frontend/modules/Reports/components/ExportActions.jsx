import { exportToExcel } from "../utils/exportExcel";
import { exportToPrint } from "./exportPrint";

import { FileText, FileDown, Printer } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PersonnelReportPDF from "./PersonnelReportPDF";

export default function ExportActions({ data, selectedColumns, columnLabels, customPageTitle, pageOptions }) {
  const pdfKey = JSON.stringify({
    data,
    selectedColumns,
    columnLabels,
    customPageTitle,
    pageOptions,
  });
  return (
    <div className="flex gap-2">
      {data?.length > 0 && selectedColumns?.length > 0 && (
        <PDFDownloadLink
          key={pdfKey} // yeniden oluşturulmasını zorla
          document={<PersonnelReportPDF data={data} selectedColumns={selectedColumns} columnLabels={columnLabels} customPageTitle={customPageTitle} pageOptions={pageOptions} />}
          fileName="personel_raporu.pdf"
        >
        
            <button title="PDF" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FileText size={18} />
            </button>
       
        </PDFDownloadLink>
      )}

      <button title="Excel" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => exportToExcel(data, selectedColumns, columnLabels, customPageTitle)}>
        <FileDown size={18} />
      </button>
      <button title="Yazdır" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => exportToPrint(data, selectedColumns, columnLabels, customPageTitle, pageOptions)}>
        <Printer size={18} />
      </button>
    </div>
  );
}
