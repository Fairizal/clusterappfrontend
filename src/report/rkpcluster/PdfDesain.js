import React, { useState } from 'react'
import { Page, Document } from 'react-pdf'

// Create Document Component
const PdfDesain = () => {
	const [numPages, setNumPages] = useState(null);
  	const [pageNumber, setPageNumber] = useState(1);

  	const onDocumentLoadSuccess = ({ numPages }) => {
    	setNumPages(numPages);
  	}

  	return (
    	<div>
      		<Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        		blablabla
      		</Document>
      		<p>
        		Page {pageNumber} of {numPages}
      		</p>
    	</div>
  	);
}

export default PdfDesain