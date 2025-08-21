// Footer.jsx
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-15 bg-gray-50 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Información del proyecto */}
                    <div className="text-center md:text-left">
                        <a
                            href="https://github.com/AndresXLP/purchasing-plan-calculator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            <p className="text-gray-700 font-medium">
                                Calculadora Plan de Compras
                            </p>
                        </a>
                        <p className="text-sm text-gray-500">
                            © {currentYear} - Licencia MIT
                        </p>
                    </div>

                    {/* Enlaces */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/AndresXLP"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            <img className="w-5 h-5" alt="github-icon" src="https://unpkg.com/simple-icons@v15/icons/github.svg" />
                            <span className="font-medium">AndresXLP</span>
                        </a>
                    </div>
                </div>

                {/* Línea separadora y mensaje */}
                <div className="border-t border-gray-200 mt-6 pt-6">
                    <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
                        Hecho con ❤️ para auxiliares de farmacia
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;