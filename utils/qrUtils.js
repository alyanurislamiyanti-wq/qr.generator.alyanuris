const qrUtils = {
    createQR: async (text, options) => {
        try {
            return await QRCode.toDataURL(text, {
                ...options,
                errorCorrectionLevel: options.errorCorrectionLevel || 'H',
                type: 'image/png',
                rendererOpts: {
                    quality: 1
                }
            });
        } catch (err) {
            throw err;
        }
    },

    formatData: (type, content) => {
        if (!content) return ' ';
        switch(type) {
            case 'url':
                return content.startsWith('http') ? content : `https://${content}`;
            case 'email':
                return `mailto:${content}`;
            case 'whatsapp':
                return content;
            case 'wifi':
                // Simple pattern for testing: WIFI:S:Name;T:WPA;P:pass;;
                return content;
            default:
                return content;
        }
    }
};