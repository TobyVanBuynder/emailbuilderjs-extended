import React, { useMemo } from 'react';

import { auditEmail } from '@emailens/engine';
import { DocumentScannerOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';

import { useDocument } from '../../../documents/editor/EditorContext';

export default function DownloadHtml() {
  const doc = useDocument();
  const href = useMemo(() => {
    const html = renderToStaticMarkup(doc, { rootBlockId: 'root' });

    const report = auditEmail(html, { framework: 'jsx' });

    console.log('Compat Outlook Windows:', report.compatibility.scores['outlook-windows']);
    // { score: 30, errors: 3, warnings: 3, info: 1 }
    //  ↑ Outlook uses Word — flexbox, gap, box-shadow, border-radius all break

    console.log('Compat Gmail Web:', report.compatibility.scores['gmail-web']);
    // { score: 75, errors: 0, warnings: 5, info: 0 }
    
    console.log('Compat Warnings:', report.compatibility.warnings);
    

    console.log('Spam score:', report.spam.score);        // 100 (clean)
    console.log('Accessibility score:', report.accessibility.score); // 88
    console.log('Size over 102 KB:', report.size.clipped);       // false (under Gmail's 102KB limit)

    return `data:text/html,${encodeURIComponent(html)}`;
  }, [doc]);
  return (
    <Tooltip title="Download HTML file">
      <IconButton href={href} download="emailTemplate.html">
        <DocumentScannerOutlined fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
