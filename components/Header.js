function Header() {
    return (
        <header className="bg-white border-b sticky top-0 z-50" data-name="header" data-file="components/Header.js">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-400 rounded-lg flex items-center justify-center">
                        <div className="icon-qr-code text-white text-lg"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-rose-400 to-rose-500 bg-clip-text text-transparent">
                        QRGen
                    </span>
                </div>
                
                <nav className="hidden md:flex items-center gap-6">
                </nav>

                <button className="md:hidden text-slate-600">
                    <div className="icon-menu text-2xl"></div>
                </button>
            </div>
        </header>
    );
}