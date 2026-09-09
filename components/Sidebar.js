function Sidebar() {
    const menuItems = [
        { icon: 'icon-house', label: 'Beranda', active: true },
        { icon: 'icon-history', label: 'Riwayat QR' },
        { icon: 'icon-star', label: 'Favorit' },
        { icon: 'icon-settings', label: 'Pengaturan' },
    ];

    const stats = [
        { label: 'QR Dibuat', value: '128', icon: 'icon-chart-bar' },
        { label: 'Penyimpanan', value: '85%', icon: 'icon-hard-drive' },
    ];

    return (
        <aside className="hidden xl:flex flex-col w-64 fixed left-0 top-16 bottom-0 bg-white border-r p-6 overflow-y-auto" data-name="sidebar" data-file="components/Sidebar.js">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xs font-semibold text-rose-300 uppercase tracking-wider mb-4 px-2">Menu Utama</h3>
                    <nav className="space-y-1">
                        {menuItems.map((item, idx) => (
                            <a 
                                key={idx} 
                                href="#" 
                                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${item.active ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'text-slate-500 hover:bg-rose-50 hover:text-rose-600'}`}
                            >
                                <div className={`${item.icon} text-lg`}></div>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-rose-300 uppercase tracking-wider mb-4 px-2">Statistik Anda</h3>
                    <div className="space-y-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`${stat.icon} text-rose-300`}></div>
                                    <span className="text-xs font-bold text-rose-600">{stat.value}</span>
                                </div>
                                <p className="text-xs text-slate-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4">
                    <div className="bg-gradient-to-br from-rose-400 to-rose-500 rounded-2xl p-4 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="font-bold text-sm mb-1">Upgrade ke Pro</h4>
                            <p className="text-[10px] text-rose-100 mb-3 leading-relaxed">Dapatkan QR Code tanpa batas dan fitur analitik lanjutan.</p>
                            <button className="w-full py-2 bg-white text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-50 transition-colors">
                                Pelajari Lebih Lanjut
                            </button>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                </div>
            </div>
            
            <div className="mt-auto pt-8 border-t">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-rose-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="avatar" />
                    </div>
                    <div>
                        <p className="text-xs font-bold">Alex Johnson</p>
                        <p className="text-[10px] text-slate-500">Free Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}