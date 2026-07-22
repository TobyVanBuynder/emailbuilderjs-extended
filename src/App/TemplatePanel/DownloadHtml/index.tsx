import React, { useMemo } from 'react';

import { DocumentScannerOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';

import { useDocument } from '../../../documents/editor/EditorContext';

export default function DownloadHtml() {
  const doc = useDocument();
  const href = useMemo(() => {
    return `data:text/html,${encodeURIComponent(renderToStaticMarkup(doc, { rootBlockId: 'root' }))}`;
  }, [doc]);
  return (
    <Tooltip title="Download HTML file">
      <IconButton href={href} download="emailTemplate.html">
        <DocumentScannerOutlined fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
