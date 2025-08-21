import React, {useState, useEffect} from 'react';
import FloatingInput from "./FloatingInput.jsx";
import { HelpModal, HelpButton } from "./HelpModal.jsx";
import Footer from "./Footer.jsx";

const PharmacyCalculator = () => {
    const [values, setValues] = useState({
        m: null,    // meses
        DI: null,   // días de inventario
        CPM: null, // consumo promedio mensual
        E: null   // existencia actual
    });

    const [results, setResults] = useState({});
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        content: null
    });

    // Contenido detallado para cada modal
    const helpContents = {
        NmE: {
            title: "Nivel Mínimo de Existencia (NmE)",
            content: (
                <div>
                    <p><strong>¿Qué es?</strong></p>
                    <p>Representa la cantidad de reserva o seguridad minima que debe tenerse para evitar el agotamiento en inventario mientras llega un nuevo pedido.</p>

                    <p><strong>¿Cómo se calcula?</strong></p>
                    <div className="formula-example">
                        NmE = CPM × 0.03333 × DI
                    </div>

                    <p><strong>Explicación:</strong></p>
                    <ul>
                        <li><strong>CPM:</strong> Consumo Promedio Mensual</li>
                        <li><strong>0.03333:</strong> Factor de conversión (1÷30 días)</li>
                        <li><strong>DI:</strong> Días de inventario deseados</li>
                    </ul>

                    <p><strong>Ejemplo práctico:</strong></p>
                    <p>Si consumes 300 cajas/mes y quieres mantener 5 días de inventario:</p>
                    <div className="formula-example">
                        NmE = 300 × 0.03333 × 5 = 50 cajas
                    </div>

                    <p><strong>Nota importante:</strong> Este valor siempre se redondea hacia arriba para garantizar stock suficiente.</p>
                </div>
            )
        },

        PR: {
            title: "Punto de Reposición (PR)",
            content: (
                <div>
                    <p><strong>¿Qué es?</strong></p>
                    <p>Es la cantidad de medicamento o dispositivos medicos que indica que es necesario realizar un nuevo pedido para evitar quedarse sin stock.</p>

                    <p><strong>¿Cómo se calcula?</strong></p>
                    <div className="formula-example">
                        PR = 2 × NmE
                    </div>

                    <p><strong>¿Por qué el doble?</strong></p>
                    <ul>
                        <li>Garantiza stock mientras llega el nuevo pedido</li>
                        <li>Considera posibles retrasos en entrega</li>
                        <li>Evita desabastecimiento por aumentos inesperados en demanda</li>
                    </ul>

                    <p><strong>Ejemplo práctico:</strong></p>
                    <p>Si tu NmE es 50 cajas:</p>
                    <div className="formula-example">
                        PR = 2 × 50 = 100 cajas
                    </div>
                </div>
            )
        },

        NME: {
            title: "Número Máximo de Existencia (NME)",
            content: (
                <div>
                    <p><strong>¿Qué es?</strong></p>
                    <p>Es la cantidad máxima recomendada en inventario para evitar sobrestock, vencimientos e incremento de costos.</p>

                    <p><strong>¿Cómo se calcula?</strong></p>
                    <div className="formula-example">
                        NME = NmE + (CPM × M)
                    </div>

                    <p><strong>Componentes:</strong></p>
                    <ul>
                        <li><strong>NmE:</strong> Stock mínimo de seguridad</li>
                        <li><strong>CPM × M:</strong> Stock para los meses proyectados</li>
                    </ul>

                    <p><strong>Ejemplo práctico:</strong></p>
                    <p>Con NmE de 50 cajas, CPM de 300 cajas/mes y proyección de 3 meses:</p>
                    <div className="formula-example">
                        NME = 50 + (300 × 3) = 950 cajas
                    </div>

                    <p><strong>Beneficios:</strong></p>
                    <ul>
                        <li>Evita exceso de inventario</li>
                        <li>Optimiza el capital de trabajo</li>
                        <li>Reduce riesgo de productos vencidos</li>
                    </ul>
                </div>
            )
        },

        P: {
            title: "Cantidad a Pedir (CP)",
            content: (
                <div>
                    <p><strong>¿Qué es?</strong></p>
                    <p>Es exactamente cuántas unidades debes ordenar en tu próxima compra.</p>

                    <p><strong>¿Cómo se calcula?</strong></p>
                    <div className="formula-example">
                        CP = PR + (CPM × M) - E
                    </div>

                    <p><strong>Desglose de la fórmula:</strong></p>
                    <ul>
                        <li><strong>PR:</strong> Punto de reposición (stock de seguridad)</li>
                        <li><strong>CPM × M:</strong> Stock necesario para los meses proyectados</li>
                        <li><strong>E:</strong> Lo que ya tienes en existencia</li>
                    </ul>

                    <p><strong>Ejemplo práctico:</strong></p>
                    <p>Con PR=100, CPM=300, M=3 meses, E=80 cajas:</p>
                    <div className="formula-example">
                        CP = 100 + (300 × 3) - 80 = 920 cajas
                    </div>

                </div>
            )
        }
    };

    const openModal = (type) => {
        const content = helpContents[type];
        setModalState({
            isOpen: true,
            title: content.title,
            content: content.content
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            title: '',
            content: null
        });
    };

    const handleInputChange = (field, value) => {
        setValues(prev => ({
            ...prev,
            [field]: parseFloat(value) || null
        }));
    };

    useEffect(() => {
        const {m, DI, CPM, E} = values;

        // Solo calcular si tenemos todos los valores necesarios
        if (!CPM || !DI) {
            setResults({});
            return;
        }

        // NmE = CPM * 0.03333 * DI (Nivel mínimo de Existencia por días de inventario)
        const NmE = CPM * 0.03333 * DI;

        // PR = 2 * NmE (Punto de Reorden)
        const PR = 2 * NmE;

        // NME = NmE + (CPM * m) (Número Máximo de Existencia)
        const NME = m ? NmE + (CPM * m) : null;

        // P = PR + (CPM * m) - E (Pedido)
        const P = (m && E !== null) ? PR + (CPM * m) - E : null;

        setResults({
            NmE: Math.ceil(NmE),  // Siempre redondea hacia arriba
            PR: Math.round(PR),
            NME: NME ? Math.round(NME) : null,
            P: P ? Math.round(P) : null,
            stockTotal: m ? Math.round(CPM * m) : null
        });
    }, [values]);

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <div className="flex items-center justify-center gap-3 text-center">
                        <div>
                            <h1 className="text-2xl font-bold">Calculadora</h1>
                            <h1 className="text-2xl font-bold">Plan de Compras</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Panel de entrada */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 text-center">
                                Datos del Plan de Compras
                            </h2>

                            <div className="grid grid-cols-1 gap-6">
                                <FloatingInput
                                    id="meses"
                                    label="M = Meses para los que se compran"
                                    value={values.m || ''}
                                    onChange={(e) => handleInputChange('m', e.target.value)}
                                    min="1"
                                    max="12"
                                />

                                <FloatingInput
                                    id="dias-inventario"
                                    label="DI = Días de inventario de seguridad"
                                    value={values.DI || ''}
                                    onChange={(e) => handleInputChange('DI', e.target.value)}
                                    min="1"
                                    max="31"
                                />

                                <FloatingInput
                                    id="consumo-mensual"
                                    label="CPM = Consumo Promedio Mensual (cajas)"
                                    value={values.CPM || ''}
                                    onChange={(e) => handleInputChange('CPM', e.target.value)}
                                    min="1"
                                />

                                <FloatingInput
                                    id="existencia-actual"
                                    label="E = Existencia actual (cajas)"
                                    value={values.E || ''}
                                    onChange={(e) => handleInputChange('E', e.target.value)}
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Panel de resultados */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 text-center">
                                Resultado Plan de Compras
                            </h2>

                            <div className="space-y-4">
                                <div className="result-card border-l-blue-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-xs font-semibold text-gray-700">
                                            NmE = Nivel mínimo de Existencia
                                        </h4>
                                        <HelpButton onClick={() => openModal('NmE')} />
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {results.NmE || 0} cajas
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {values.CPM || 'CPM'} × 0.03333 × {values.DI || 'DI'}
                                    </p>
                                </div>

                                <div className="result-card border-l-orange-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-xs font-semibold text-gray-700">
                                            PR = Punto de Reposición
                                        </h4>
                                        <HelpButton onClick={() => openModal('PR')} />
                                    </div>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {results.PR || 0} cajas
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        2 × {results.NmE || 'NmE'}
                                    </p>
                                </div>

                                <div className="result-card border-l-purple-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-xs font-semibold text-gray-700">
                                            NME = Número Máximo de Existencia
                                        </h4>
                                        <HelpButton onClick={() => openModal('NME')} />
                                    </div>
                                    <p className="text-2xl font-bold text-purple-600">
                                        {results.NME || 0} cajas
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {results.NmE || 'NmE'} + ({values.CPM || 'CPM'} × {values.m || 'M'})
                                    </p>
                                </div>

                                <div className="result-card border-l-green-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-xs font-semibold text-gray-700">
                                            CP = Cantidad a Pedir
                                        </h4>
                                        <HelpButton onClick={() => openModal('P')} />
                                    </div>
                                    <p className="text-2xl font-bold text-green-600">
                                        {results.P || 0} cajas
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {results.PR || 'PR'} + ({values.CPM || 'CPM'} × {values.m || 'M'}) - {values.E || 'E'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de ayuda */}
            <HelpModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={modalState.title}
                content={modalState.content}
            />

            <Footer />
        </div>

    );
};

export default PharmacyCalculator;