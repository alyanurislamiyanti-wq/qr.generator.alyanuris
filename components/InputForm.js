function InputForm({ qrData, onDataChange }) {
    const types = [
        { id: 'url', label: 'Tautan', icon: 'icon-link' },
        { id: 'text', label: 'Teks', icon: 'icon-file-text' },
        { id: 'email', label: 'Email', icon: 'icon-mail' },
        { id: 'wifi', label: 'WiFi', icon: 'icon-wifi' },
        { id: 'vcard', label: 'Kontak', icon: 'icon-user' },
        { id: 'whatsapp', label: 'WhatsApp', icon: 'icon-message-circle' }
    ];

    const renderInputs = () => {
        switch(qrData.type) {
            case 'url':
                return (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">URL Tujuan</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 icon-globe text-rose-300"></div>
                            <input 
                                type="url" 
                                placeholder="https://example.com" 
                                className="input-field pl-12"
                                value={qrData.content}
                                onChange={(e) => onDataChange({content: e.target.value})}
                            />
                        </div>
                    </div>
                );
            case 'text':
                return (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700">Teks Bebas</label>
                        <textarea 
                            rows="4"
                            placeholder="Ketik pesan atau informasi di sini..."
                            className="input-field resize-none"
                            value={qrData.content}
                            onChange={(e) => onDataChange({content: e.target.value})}
                        ></textarea>
                    </div>
                );
            case 'whatsapp':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nomor HP</label>
                            <input 
                                type="tel" 
                                placeholder="628123456789" 
                                className="input-field"
                                value={qrData.phone || ''}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    onDataChange({phone: val, content: `https://wa.me/${val}`});
                                }}
                            />
                        </div>
                    </div>
                );
            default:
                return <p className="text-rose-300 italic">Fitur ini akan segera hadir.</p>;
        }
    };

    return (
        <div data-name="input-form" data-file="components/InputForm.js">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                {types.map(t => (
                    <button 
                        key={t.id}
                        onClick={() => onDataChange({type: t.id, content: ''})}
                        className={`tab-btn ${qrData.type === t.id ? 'active' : ''}`}
                    >
                        <div className={`${t.icon} text-2xl`}></div>
                        <span className="text-xs font-semibold">{t.label}</span>
                    </button>
                ))}
            </div>

            <div className="min-h-[160px]">
                {renderInputs()}
            </div>
        </div>
    );
}