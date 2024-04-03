import { createSlice } from "@reduxjs/toolkit";

// Define un slice para el estado del filtro
const filterSlice = createSlice({
  name: 'filter',
  initialState: '', // Estado inicial del filtro (cadena vacía)
  reducers: {
    // Acción para cambiar el filtro
    setFilter(state, action) {
      // Directamente retorna el nuevo valor del filtro
      // Redux Toolkit permite "modificar" el estado de esta manera,
      // pero internamente realiza cambios inmutables
      return action.payload;
    },
  },
});

// Exporta las acciones generadas automáticamente
export const { setFilter } = filterSlice.actions;

// Exporta el reducer generado por el slice
export default filterSlice.reducer;