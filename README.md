# 💊 Calculadora Plan de Compras

> **Calculadora de Plan de Compras Farmacéuticas**

Una aplicación web moderna y responsive para calcular planes de compra en farmacias, diseñada específicamente para auxiliares farmacéuticos.
Calcula automáticamente niveles mínimos, puntos de reposición, existencias máximas y cantidades a pedir.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan.svg)](https://tailwindcss.com/)

## 🌟 Características

### ✨ **Funcionalidades Principales**
- **Cálculos automáticos** de inventario farmacéutico
- **4 métricas clave**: NmE, PR, NME y Cantidad a Pedir
- **Floating labels** con animaciones suaves
- **Sistema de ayuda contextual** con modales explicativos
- **Modo oscuro completo** con persistencia de preferencias
- **Interfaz responsive** optimizada para móviles y desktop

### 🧮 **Fórmulas Implementadas**

| Métrica | Fórmula | Descripción |
|---------|---------|-------------|
| **NmE** | `CPM × 0.03333 × DI` | Nivel Mínimo de Existencia |
| **PR** | `2 × NmE` | Punto de Reposición |
| **NME** | `NmE + (CPM × M)` | Número Máximo de Existencia |
| **CP** | `PR + (CPM × M) - E` | Cantidad a Pedir |

### 🎨 **Tecnologías**
- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconografía moderna
- **CSS Modules** - Estilos componentizados

## 🚀 Instalación

### **Prerrequisitos**
- Node.js 22+
- npm o yarn

### **Setup del proyecto**
```bash
# Clonar el repositorio
git clone https://github.com/AndresXLP/purchasing-plan-calculator.git
cd purchasing-plan-calculator

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📱 Uso

### **1. Ingresar Datos**
- **M**: Meses para los que se compran (1-12)
- **DI**: Días de inventario de seguridad (1-31)
- **CPM**: Consumo Promedio Mensual en cajas
- **E**: Existencia actual en cajas

### **2. Interpretar Resultados**
- **NmE**: Stock mínimo que siempre debes tener
- **PR**: Nivel que activa una nueva orden de compra
- **NME**: Stock máximo recomendado
- **CP**: Cantidad exacta a pedir ahora

### **3. Ayuda Contextual**
Haz clic en los iconos de ayuda (❓) junto a cada resultado para obtener explicaciones detalladas con ejemplos prácticos.

## 📊 Ejemplo Práctico

```
Datos de entrada:
- M = 3 meses
- DI = 5 días
- CPM = 600 cajas/mes
- E = 200 cajas actuales

Resultados:
- NmE = 100 cajas (stock mínimo)
- PR = 200 cajas (punto para pedir)
- NME = 1,900 cajas (stock máximo)
- CP = 1,800 cajas (cantidad a pedir)
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**AndresXLP**
- GitHub: [@AndresXLP](https://github.com/AndresXLP)

## 🙏 Agradecimientos

- **A mi esposa** por inspirar este proyecto durante sus estudios como auxiliar de farmacia.

## ⚖️ Disclaimer

Esta herramienta es solo para fines educativos y de planificación. Los cálculos deben ser validados por profesionales farmacéuticos. No nos hacemos responsables por decisiones comerciales basadas únicamente en estos resultados.

---

<div align="center">

**Hecho con ❤️ para auxiliares de farmacia**

[⭐ Dale una estrella si te gusta el proyecto](https://github.com/AndresXLP/pharmacy-procurement-planner)

</div>