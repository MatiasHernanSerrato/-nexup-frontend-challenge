# Nexup Frontend Challenge

En este repositorio, se encuentra la prueba técnica para el puesto de Frontend Developer en Nexup.
Este challenge está diseñado para evaluar tus habilidades en React y TypeScript. Consiste en construir una aplicación que muestre una lista de productos, permita filtrarlos por categoría y transforme los elementos de la lista antes de mostrarlos.

## Pasos a seguir:
1. Clone este repositorio en su máquina local usando Git.
   ```bash
   git clone https://gitlab.com/nexup/nexup-frontend-challenge.git
   ```
2. Crea un repositorio vacío en tu cuenta de GitHub con el mismo nombre de este.
   ```bash
    nexup-frontend-challenge
   ```
3. Muevesé a la carpeta del proyecto.
   ```bash
   cd ./nexup-frontend-challenge
   ```
4. Cambia la URL remota del repositorio clonado de GitHub, por la URL de tu repositorio.
   ```bash
   git remote set-url origin <tu-repositorio.git>
   ```
5. Sube el código a tu repositorio de GitHub.

## Recomedaciones
- **No** hagas un _fork_ de este repositorio.
- **No** hagas _push_ directamente a este repositorio.
- Crea un commit por cada cambio que realices. Utiliza mensajes **claros** y **descriptivos** para documentar tu proceso.
- Priorizá la correcta resolución lógica del challenge, no buscamos diseños complejos y complicados
  - Mantené el código ordenado y fácil de entender
  - Modularizá los componentes y armá funciones atómicas y reutilizables
  - Es válida la creación de nuevos componentes intermedios para resolver el problema, los componentes presentados son sugeridos

## Tareas
El objetivo de este challenge es armar un listado de productos que pueda ser filtrado por un selector de categoría:
- El selector de categoría `CategoryFilter` debe por defecto mostrar una categoría de `Todos`, y debe permitir elegir alguno de los valores permitidos (la lista puede ser expandida si se lo desea). Al elegir un valor, se debe actualizar la lista de productos
- El listado de productos `ProductList`
  - La lista debe mostrarse filtrada según la categoría elegida
  - Cada item debe mostrar los siguientes datos:
    - Estado del producto: Debe mostrarse como una indicador de color según el estado del producto
    - Nombre del producto
    - Categoria del producto
    - Precio del producto: Debe mostrarse con dos puntos decimales y el signo `$`
- La interfaz debe ser sencilla y clara. El estilado de componentes es libre, pero se valorará la correcta utilización de técnicas de CSS como Flexbox, Grid, etc.

### Objetivos opcionales
- Simular que la obtensión del listado de productos proviene de una API Rest
- Agregar un filtro por fulltext de los productos
- Armar funcionalidad de stock: Por cada producto podria tenerse un stock disponible, y entonces mostrar el stock disponible en el listado y permitir filtrar unicamente aquellos productos con stock
- Hacer un diseño responsive

## Entregables
- Un enlace a un repositorio de GitHub con el código de la aplicación React.
- Opcional: Un archivo README con explicaciones sobre el enfoque utilizado y cualquier otra información relevante.

## Evaluación
- Correctitud del código: La aplicación debe funcionar correctamente según los requisitos.
- Calidad del código: Claridad, uso adecuado de TypeScript, organización y limpieza del código.
- Eficiencia: La lógica debe ser eficiente y bien estructurada.
- Estilado correcto del código

---

## Implementación (esta solución)

### Resumen
Aplicación en React + TypeScript con Material UI que lista productos, permite filtrar por categoría, búsqueda y stock, e incluye estados de carga y vacío. Se optimiza la búsqueda con `useDeferredValue` y se unifican estilos con variables CSS globales (colores, espaciados, radios).

### Stack
- React 18 + TypeScript
- Material UI (`@mui/material`)
- CRA (`react-scripts`) para desarrollo y build

### Cómo correr el proyecto

```bash
npm install
npm start
```

Scripts útiles:

```bash
npm run build     # Compila producción
npm test          # Ejecuta tests por defecto de CRA
npm run lint      # Lint de archivos TS/TSX
npm run lint:fix  # Auto-fix de ESLint/Prettier
```

### Arquitectura de componentes
- Contenedor: [src/components/ProductManager/ProductManager.tsx](src/components/ProductManager/ProductManager.tsx)
   - Orquesta fetch de datos, estado global de filtros (`categoría`, `búsqueda`, `solo stock`) y renderiza contenido según estado (`loading`, `empty`, `list`).
   - Optimiza búsqueda con `useDeferredValue` para evitar re-render costoso mientras se escribe.
- Lista: [src/components/ProductList/ProductList.tsx](src/components/ProductList/ProductList.tsx)
   - Renderiza una grilla responsive con CSS Grid.
- Tarjeta: [src/components/ProductList/CardProduct/CardProduct.tsx](src/components/ProductList/CardProduct/CardProduct.tsx)
   - Muestra nombre, categoría, precio, estado y stock con `Chip` y badge de color.
   - Usa `statusColor` para colorear el estado.
- Filtro de categoría: [src/components/CategoryFilter/CategoryFilter.tsx](src/components/CategoryFilter/CategoryFilter.tsx)
   - `Select` de MUI con opción `Todos` y categorías definidas.

Patrón de barrels (`components/<Nombre>/index.ts`):
- [src/components/ProductManager/index.ts](src/components/ProductManager/index.ts)
- [src/components/ProductList/index.ts](src/components/ProductList/index.ts)
- [src/components/CategoryFilter/index.ts](src/components/CategoryFilter/index.ts)

Estos archivos re-exportan el componente principal y permiten imports más limpios: en [src/App.tsx](src/App.tsx) se importa `ProductManager` desde la carpeta, no desde el archivo directo.

### Datos y tipos
- Productos mock: [src/api/products.ts](src/api/products.ts)
- Fetch simulado: [src/api/services.ts](src/api/services.ts) (`fetchProductList` con pequeño delay)
- Tipos:
   - [src/types/Product.ts](src/types/Product.ts)
   - [src/types/ProductCategory.ts](src/types/ProductCategory.ts)
   - [src/types/ProductStatus.ts](src/types/ProductStatus.ts)
- Constantes: [src/utils/const.ts](src/utils/const.ts) (`ALL_CATEGORIES`)
- Utilidades:
   - [src/utils/utils.ts](src/utils/utils.ts) (`formatPrice`)
   - [src/utils/statusColor.ts](src/utils/statusColor.ts) (`statusColor` mapea `Active`/`Inactive` a colores)

### Estilos y UX
- Variables CSS globales y layout: [src/index.css](src/index.css)
   - Variables de espaciado, radios y colores
   - Contenedor `.product-manager` con ancho máximo
   - Panel de filtros con fondo, borde y `flex-wrap`
   - Grilla `.product-list` y hover sutil de tarjetas `.product`
   - Estado vacío `.empty-state` consistente con el tema
- Título y wrapper: [src/App.tsx](src/App.tsx)
- Componentes MUI con `size="small"`, `fullWidth` en búsqueda y `Chip` para categoría/stock.

### Lógica de filtrado
En [src/components/ProductManager/ProductManager.tsx](src/components/ProductManager/ProductManager.tsx):
- Normaliza búsqueda (`trim` + `toLowerCase`) y aplica filtros combinados:
   - Categoría (ignora si es `ALL_CATEGORIES`)
   - Stock (`(product.stock ?? 0) > 0`)
   - Texto (match en nombre + categoría)
- Estados visuales:
   - `loading`: muestra `CircularProgress`
   - `empty`: tarjeta de mensaje
   - `list`: renderiza [ProductList](src/components/ProductList/ProductList.tsx)

### Accesibilidad
- Labels descriptivos en filtros (e.g., "Categoría", "Buscar")
- Indicador de estado con `aria-label` descriptivo en la tarjeta

### Consideraciones futuras
- Tema de MUI (palette/typography) para unificar más el estilo
- Modo oscuro y persistencia de filtros (e.g., `localStorage`)


