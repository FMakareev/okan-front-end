import React from 'react';
import FileSaver from 'file-saver';

export const exportDocument = (id, name) => {
  let formData = new FormData();
  formData.append('document', id);
  return fetch(`${ENDPOINT_CLIENT}/docx_converter/convert`, {
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
    body: formData,
  })
    .then(response => {
      return response.blob();
    })
    .then(blob => {
      FileSaver.saveAs(blob, `${name || 'document'}.docx`);
    })
    .catch(error => {
      captureException(error, 'Error exportDocument: ');
    });
};

/**
 * @desc
 * */
export let withExportDocument = WrappedComponent => {
  return props => {
    return <WrappedComponent exportDocument={exportDocument} {...props} />;
  };
};

export default withExportDocument;
