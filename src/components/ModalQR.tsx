import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './ModalQR.css';

interface ModalQRProps {
  id: string;
  nombre: string;
  onClose: () => void;
}

export default function ModalQR({ id, nombre, onClose }: ModalQRProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const publicUrl = `${window.location.origin}/objeto/${id}`;

  const handleDownload = () => {
    const svgElement = qrRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = `QR-${nombre.replace(/\s+/g, '_')}-${id.split('-')[0]}.png`;
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    const svgElement = qrRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head><title>QR - ${nombre}</title></head>
        <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;margin:0;">
          <h2 style="color:#0f172a;margin-bottom:8px;">${nombre}</h2>
          <p style="color:#64748b;font-size:0.85rem;margin-bottom:24px;">ID: ${id.split('-')[0]}</p>
          ${svgData}
          <p style="color:#94a3b8;font-size:0.75rem;margin-top:24px;">LostDesk — Sistema de Objetos Perdidos</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content qr-modal" onClick={(e) => e.stopPropagation()}>
        <div className="qr-modal-header">
          <h2>Código QR del Objeto</h2>
          <button className="close-x-btn" onClick={onClose} aria-label="Cerrar modal QR">✕</button>
        </div>

        <p className="qr-modal-subtitle">{nombre}</p>
        <p className="qr-modal-id">ID: <code>{id.split('-')[0]}</code></p>

        <div className="qr-code-wrapper" ref={qrRef}>
          <QRCodeSVG
            value={publicUrl}
            size={200}
            level="H"
            includeMargin
            bgColor="#ffffff"
            fgColor="#0f172a"
          />
        </div>

        <p className="qr-url-label">{publicUrl}</p>

        <div className="qr-modal-actions">
          <button className="btn-secondary" onClick={handleDownload}>
            📥 Descargar PNG
          </button>
          <button className="btn-primary" onClick={handlePrint}>
            🖨️ Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}
