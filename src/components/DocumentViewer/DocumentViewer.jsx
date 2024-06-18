import { useRef, useState } from "react";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Pagination from '../Pagination/Pagination';
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const DocumentViewer = ({ currentFile = null }) => {
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const documentRef = useRef(null);

  const handleLoadSuccess = (e) => {
    setPages(e.numPages);
  };

  const handleSelectPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="max-h-[calc(100vh-20rem)]" ref={documentRef}>
        {
          currentFile && <Document file={currentFile} onLoadSuccess={handleLoadSuccess}>
            <Page pageNumber={currentPage} />
          </Document>
        }
      </div>
      {
        (currentFile && pages) && <div className="flex justify-center mt-5">
          <Pagination totalCount={pages} pageSize={1} onPageClick={(pageNumber) => handleSelectPage(pageNumber)} />
        </div>
      }
    </>
  )
};

export default DocumentViewer;