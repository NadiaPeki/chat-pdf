'use client';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import {Document, Page, pdfjs} from 'react-pdf';
import { useEffect, useState } from 'react';
import {Button} from './ui/button';
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from 'lucide-react';

//We need to configure CORS
// gsutil cors set cors.json gs://<app-name>.appspot.com
//gsutil cors set cors.json gs://chat-with-pdf-project.appspot.com
// go here >>> https://console.cloud.google.com/
// create new file in editor calls cors.json
// run >>> // gsutil cors set cors.json gs://chat-with-pdf-project.appspot.com
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

function PdfView({ url }: { url: string }) {
  return <div>PdfView</div>;
}
export default PdfView;
