# PRD 01 — Editor 3D Ligero (Kitbash + Export)

## 1. Overview
Aplicación que permite crear escenas 3D simples combinando primitivas y assets básicos, con exportación a formatos estándar.

## 2. Objetivo del Producto
Facilitar la creación rápida de escenas 3D simples para prototipos, juegos indie o visualización básica.

## 3. Usuarios Objetivo
- Desarrolladores indie
- Diseñadores técnicos
- Estudiantes de gráficos 3D

## 4. Casos de Uso Principales
1. Crear una escena desde cero
2. Añadir y transformar objetos 3D
3. Aplicar materiales simples
4. Exportar la escena

## 5. Alcance (In-Scope)
- Primitivas básicas
- Transformaciones (move/rotate/scale)
- Materiales simples
- Exportación de escena

## 6. Fuera de Alcance (Out-of-Scope)
- Simulación física
- Animaciones complejas
- Renderizado avanzado

## 7. Requisitos Funcionales
1. Crear, eliminar y organizar objetos en una escena
2. Manipular transformaciones en 3D
3. Asignar materiales básicos
4. Exportar la escena completa

## 8. Requisitos No Funcionales
- UI responsiva
- Export consistente
- Rendimiento aceptable con escenas pequeñas

## 9. Inputs y Outputs
### Inputs
- Acciones del usuario
- Assets básicos (opcional)

### Outputs
- Archivo de escena exportado (formato estándar)

## 10. Flujos Clave
Creación de escena → Edición → Exportación

## 11. Edge Cases Conocidos
- Escena vacía
- Export sin objetos
- Transformaciones extremas

## 12. Métricas de Éxito
- Escena exportada correctamente
- Sin pérdida de datos básicos

## 13. Suposiciones y Restricciones
- Uso individual
- Sin colaboración en tiempo real

## 14. Riesgos
- Complejidad UI
- Manejo de formatos
