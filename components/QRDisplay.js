function QRDisplay({ qrUrl, qrData, onDownload }) {
    const downloadQR = (format) => {
        try {
            const link = document.createElement('a');
            link.download = `qr-code-${Date.now()}.${format}`;
            link.href = qrUrl;
            link.click();
            onDownload();
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    return (
        <section className="card text-center" data-name="qr-display" data-file="components/QRDisplay.js">
            <h2 className="text-lg font-bold mb-6">Pratinjau QR Code</h2>
            
            <div className="relative group bg-rose-50 rounded-2xl p-8 mb-6 inline-block w-full max-w-[300px] border-2 border-dashed border-rose-200 aspect-square flex items-center justify-center">
                {qrUrl ? (
                    <div className="relative">
                        <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain shadow-sm rounded-lg" />
                        {qrData.logo && (
                             <img 
                                src={qrData.logo} 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded bg-white p-1"
                                alt="logo overlay"
                             />
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-rose-300">
                        <div className="icon-loader animate-spin text-3xl mb-2"></div>
                        <p className="text-sm">Menghasilkan...</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <button onClick={() => downloadQR('png')} className="btn btn-primary">
                    <div className="icon-download"></div>
                    PNG
                </button>
                <button onClick={() => downloadQR('jpg')} className="btn btn-outline">
                    <div className="icon-image"></div>
                    JPG
                </button>
            </div>

            <p className="text-xs text-slate-500 bg-rose-50 p-3 rounded-lg border border-rose-100 italic">
                Tips: Pastikan kontras warna cukup tinggi agar mudah dipindai oleh perangkat kamera.
            </p>
        </section>
    );
}