import { jsPDF, AcroFormTextField } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PDFDocument } from "pdf-lib";

export const generateSupplyDocument = async (header = [[]], body = [], documentData = {
  supplier: '',
  employeeName: '',
  employeePosition: ''
}, signUrl) => {
  const documentProcessor = new DocumentProcessor({
    page: {
      orientation: 'p',
      unit: 'pt',
      format: 'letter'
    },
    margins: {
      right: 10
    }
  });

  documentProcessor.addText('Date: ' + new Date().toISOString().split('T')[0], 20);
  documentProcessor.addText(
    'We are pleased to place the following order with your company. Please acknowledge receipt of this order and confirm delivery dates as soon as possible.',
    20
  );

  documentProcessor.addTable(body, header);
  documentProcessor.addText('Sincerely,', 30);
  documentProcessor.addText(`Name: ${documentData.employeeName}`, 20);
  documentProcessor.addText(`Position: ${documentData.employeePosition}`, 20);
  documentProcessor.addText(`Supplier, ${documentData.supplier} `, 0, documentProcessor.width / 2);

  if (signUrl) {
    documentProcessor.addImage(
      signUrl,
      100,
      documentProcessor.currentY - 50,
      100,
      80
    );
  }

  documentProcessor.addLine(
    100,
    documentProcessor.currentY,
    200,
    documentProcessor.currentY
  );

  documentProcessor.addLine(
    documentProcessor.width - 120,
    documentProcessor.currentY,
    documentProcessor.width - 20,
    documentProcessor.currentY
  );

  documentProcessor.addTextField(documentProcessor.width - 120, documentProcessor.currentY - 55, 100, 80);

  return documentProcessor.getFile(`document${Date.now()}.pdf`);
};

export const generateSupplierSupplyDocument = async (header = [[]], body = [], documentData = {
  supplierName: '',
  supplierEmail: '',
  supplierPhone: '',
  employeeName: ''
}, signUrl) => {
  const documentProcessor = new DocumentProcessor({
    page: {
      orientation: 'p',
      unit: 'pt',
      format: 'letter'
    },
    margins: {
      right: 10
    }
  });

  documentProcessor.addText(documentData.supplierName, 20);
  documentProcessor.addText(documentData.supplierEmail, 20);
  documentProcessor.addText(documentData.supplierPhone, 20);

  documentProcessor.addText('Date: ' + new Date().toISOString().split('T')[0], 40);
  documentProcessor.addText(
    'Next products were provided according to the supply request.',
    20
  );
  documentProcessor.addTable(body, header);
  documentProcessor.addText(
    `Thank you for your business. If you have any questions or concerns regarding this invoice, please contact us at ${documentData.supplierEmail}.`,
    20
  );
  documentProcessor.addText('Sincerely,', 50);
  documentProcessor.addText(`Supplier: ${documentData.supplierName}`, 20);
  documentProcessor.addText(`Employee, ${documentData.employeeName} `, 0, documentProcessor.width / 2);

  if (signUrl) {
    documentProcessor.addImage(
      signUrl,
      100,
      documentProcessor.currentY - 35,
      100,
      80
    );
  }

  documentProcessor.addLine(
    100,
    documentProcessor.currentY,
    200,
    documentProcessor.currentY
  );

  documentProcessor.addLine(
    documentProcessor.width - 120,
    documentProcessor.currentY,
    documentProcessor.width - 20,
    documentProcessor.currentY
  );
  documentProcessor.addTextField(documentProcessor.width - 120, documentProcessor.currentY - 55, 100, 80);

  return documentProcessor.getFile(`document${Date.now()}.pdf`);
};

export const signSupplyDocument = async (currentDocument, signUrl) => {
  const base64File = await getStringFromFile(currentDocument);
  const document = await PDFDocument.load(base64File);

  const signature = await document.embedPng(signUrl);
  document.getForm().getTextField('signature').setImage(signature);

  const file = await document.save();
  const blob = new Blob([new Uint8Array(file)], { type: 'application/pdf' });
  return new File([blob], `document${Date.now()}.pdf`);
};

export const getStringFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const getFileFromString = async (string, name) => {
  const blob = base64ToBlob(string);
  return new File([blob], name);
};

const base64ToBlob = (str) => {
  const pos = str.indexOf(';base64,');
  const type = str.substring(5, pos);
  const b64 = str.substr(pos + 8);
  const content = atob(b64);
  const buffer = new ArrayBuffer(content.length);
  const view = new Uint8Array(buffer);
  for (let n = 0; n < content.length; n++) {
    view[n] = content.charCodeAt(n);
  }
  const blob = new Blob([buffer], { type: type });
  return blob;
};

class DocumentProcessor {
  #documentPdf = new jsPDF();
  #rightMargin;
  #currentY;
  #width;
  #height;


  constructor(params = {
    page: {
      orientation: 'p',
      unit: 'pt',
      format: 'letter',
    },
    margins: {
      right: 10
    }
  }) {
    this.createDocument(params.page);

    this.#rightMargin = params.margins.right;
    this.#currentY = 0;
    this.#height = this.#documentPdf?.internal.pageSize.getHeight();
    this.#width = this.#documentPdf?.internal.pageSize.getWidth();
  }

  get rightMargin() {
    return this.#rightMargin;
  }
  get currentY() {
    return this.#currentY;
  }
  get height() {
    return this.#height;
  }
  get width() {
    return this.#width;
  }

  createDocument = (params = {
    orientation: 'p',
    unit: 'pt',
    format: 'letter'
  }) => {
    const document = new jsPDF(params);
    document.setFontSize(12);
    document.setPage(1);
    this.#documentPdf = document;
  }

  addText = (text, newMarginTop, newMarginRight) => {
    this.#currentY += newMarginTop;
    if (this.#currentY >= this.#height) {
      this.#documentPdf.addPage('letter');
      const pagesAmount = this.#documentPdf.getNumberOfPages();
      this.#documentPdf.setPage(pagesAmount + 1);
      this.#currentY = newMarginTop;
    }
    this.#documentPdf.text(
      this.#documentPdf.splitTextToSize(
        text,
        this.#width - this.#rightMargin
      ),
      newMarginRight || this.#rightMargin,
      this.#currentY
    );
  };

  addTable = (body = [], header = [[]]) => {
    let tableHeight = 0;

    autoTable(this.#documentPdf, {
      theme: 'grid',
      head: header,
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 1,
        cellPadding: 2,
        fontSize: 12,
        fontStyle: 'normal'
      },
      startY: this.#currentY + 25,
      body: body,
      didDrawPage: (data) => {
        tableHeight = data.cursor.y;
      }
    });
    this.#currentY = Math.round(tableHeight);
  };

  addImage = (imageUrl, x, y, w, h) => {
    this.#documentPdf.addImage(imageUrl, x, y, w, h);
  };

  addLine = (x1, y1, x2, y2) => {
    this.#documentPdf.line(x1, y1, x2, y2);
  };

  addTextField = (x, y, w, h) => {
    const textField = new AcroFormTextField();
    textField.fieldName = 'signature';
    textField.defaultValue = 'signature';
    textField.value = 'signature';
    textField.fontSize = 12;
    textField.height = h;
    textField.width = w;
    textField.x = x;
    textField.y = y;

    this.#documentPdf.setDrawColor('#FFFFFF');
    this.#documentPdf.rect(textField.x, textField.y, textField.width, textField.height, 'S');
    this.#documentPdf.addField(textField);
  };

  getFile = (fileName) => {
    return new File([this.#documentPdf.output('blob')], fileName);
  };
}