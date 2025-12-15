import { Download } from 'lucide-react'

// import to make a pdf file downloadable and viewable
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


import WindowWrapper from '#hoc/WindowWrapper'
import { WindowControls } from '#components'

const Resume = ({ isMaximized }) => {
  return (
    <div className={isMaximized ? 'h-full flex flex-col' : ''}>
        <div id='window-header'>
            <WindowControls  target="resume" />
            <h2>Resume.pdf</h2>

            <a 
                href="files/resume.pdf" 
                download 
                className='cursor-pointer' 
                title='Download Resume'
            >
                <Download className='icon' />
            </a>
        </div>

        <div className={`overflow-y-auto ${isMaximized ? 'flex-1 flex justify-center bg-gray-100' : 'max-h-[550px]'}`}>
            <Document file="files/resume.pdf" >
                <Page 
                    pageNumber={1} 
                    renderTextLayer 
                    renderAnotationLayer 
                />
            </Document>
        </div>
    </div>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume');

export default ResumeWindow;