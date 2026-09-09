class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="text-center max-w-md">
                        <div className="icon-triangle-alert text-red-500 text-6xl mx-auto mb-4"></div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h1>
                        <p className="text-gray-600 mb-6">Aplikasi mengalami kendala teknis. Silakan muat ulang halaman.</p>
                        <button onClick={() => window.location.reload()} className="btn btn-primary w-full">Muat Ulang</button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function App() {
    const [qrData, setQrData] = React.useState({
        type: 'url',
        content: 'https://trickle.so',
        color: '#475569',
        bgColor: '#ffffff',
        margin: 4,
        width: 1024,
        errorLevel: 'H',
        logo: null
    });

    const [qrUrl, setQrUrl] = React.useState('');
    const [history, setHistory] = React.useState([]);

    React.useEffect(() => {
        generateQR();
    }, [qrData]);

    const generateQR = async () => {
        try {
            const dataString = qrUtils.formatData(qrData.type, qrData.content);
            const url = await qrUtils.createQR(dataString, {
                color: {
                    dark: qrData.color,
                    light: qrData.bgColor
                },
                margin: qrData.margin,
                width: qrData.width,
                errorCorrectionLevel: qrData.errorLevel
            });
            setQrUrl(url);
        } catch (err) {
            console.error("QR Generation failed", err);
        }
    };

    const handleDataChange = (newData) => {
        setQrData(prev => ({ ...prev, ...newData }));
    };

    const saveToHistory = () => {
        const newEntry = {
            id: Date.now(),
            ...qrData,
            qrUrl,
            timestamp: new Date().toISOString()
        };
        setHistory([newEntry, ...history.slice(0, 9)]);
    };

    return (
        <div className="min-h-screen flex flex-col" data-name="app-container" data-file="app.js">
            <Header />
            <Sidebar />
            <main className="flex-1 xl:ml-64 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <div className="relative overflow-hidden bg-rose-50 rounded-3xl p-8 mb-8 border border-rose-100">
                        <div className="relative z-10">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-slate-800 mb-2">Halo, Selamat Datang! ✨</h1>
                                <p className="text-slate-600">Buat QR Code cantikmu sekarang dengan mudah dan cepat.</p>
                            </div>
                        </div>
                    </div>

                    <section className="card relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
                                <div className="icon-pencil text-xl"></div>
                            </div>
                            <h2 className="text-xl font-bold">Input Data</h2>
                        </div>
                        <InputForm qrData={qrData} onDataChange={handleDataChange} />
                    </section>

                    <section className="card">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
                                <div className="icon-settings text-xl"></div>
                            </div>
                            <h2 className="text-xl font-bold">Kustomisasi</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Warna QR</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="color" 
                                        value={qrData.color} 
                                        onChange={(e) => handleDataChange({color: e.target.value})}
                                        className="h-10 w-20 rounded cursor-pointer"
                                    />
                                    <input 
                                        type="text" 
                                        value={qrData.color} 
                                        onChange={(e) => handleDataChange({color: e.target.value})}
                                        className="flex-1 px-3 py-2 border rounded-lg uppercase"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Warna Background</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="color" 
                                        value={qrData.bgColor} 
                                        onChange={(e) => handleDataChange({bgColor: e.target.value})}
                                        className="h-10 w-20 rounded cursor-pointer"
                                    />
                                    <input 
                                        type="text" 
                                        value={qrData.bgColor} 
                                        onChange={(e) => handleDataChange({bgColor: e.target.value})}
                                        className="flex-1 px-3 py-2 border rounded-lg uppercase"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <QRDisplay qrUrl={qrUrl} qrData={qrData} onDownload={saveToHistory} />
                    
                    {history.length > 0 && (
                        <section className="card">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <div className="icon-clock text-rose-300"></div>
                                Riwayat Terakhir
                            </h3>
                            <div className="space-y-3">
                                {history.map(item => (
                                    <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100">
                                        <img src={item.qrUrl} className="w-12 h-12 rounded border" alt="history-qr" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.content}</p>
                                            <p className="text-xs text-rose-300 uppercase">{item.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <footer className="py-8 border-t bg-white mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                    &copy; 2026 QRGen Modern. Dibuat dengan presisi untuk kebutuhan digital Anda.
                </div>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);