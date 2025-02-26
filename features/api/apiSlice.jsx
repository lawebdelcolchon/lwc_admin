// src/app/apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthToken } from '../../app/authUtils';

export const fetchEntities = createAsyncThunk(
  'entities/fetchEntities',
  async ({ entityName, page, limit, fields, sort, sortOrder, dbName, includeAssociations,
    includeConfig }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication token is missing');

      const response = await axios.get(`/api/${entityName}`, {
        headers: {
          authorization: token,
        },
        params: {
          dbName,  
          page,
          limit,
          fields,
          sort,
          sortOrder,
          includeAssociations,
          includeConfig
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchEntityById = createAsyncThunk(
  'entities/fetchEntityById',
  async ({ entityName, id, dbName }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication token is missing');

      const response = await axios.get(`/api/${entityName}/${id}`, {
        headers: {
          authorization: token,
        },
        params: {
          dbName,  
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createEntity = createAsyncThunk(
  'entities/createEntity',
  async ({ entityName, newEntity, dbName }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication token is missing');

      const response = await axios.post(`/api/${entityName}`, {
        headers: {
          authorization: token,
        },
        params: {
          dbName, 
          newEntity
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEntity = createAsyncThunk(
  'entities/updateEntity',
  async ({ entityName, id, updatedEntity, dbName }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication token is missing');

      const response = await axios.put(
        `/api/${entityName}/${id}`,
        updatedEntity,
        {
          headers: { authorization: token },
          params: { dbName },
        }
      );

      // Retornar la respuesta del backend tal cual
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEntity = createAsyncThunk(
  'entities/deleteEntity',
  async ({ entityName, id, dbName }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication token is missing');

      const response = await axios.delete(`/api/${entityName}/${id}`, {
        headers: { authorization: token },
        params: { dbName },
      });

      // Retornar el id del registro eliminado desde el backend
      return response.data; // Supone que el backend envía { message, id }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchExecuteSQL = createAsyncThunk(
  'entities/fetchExecuteSQL',
  async ({ fields, pivotTable, joinTable, joinCondition, joinType, whereCondition, orderBy, page = 1, limit = 50, noPagination = false, dbName }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('Authentication token is missing');

      const response = await axios.get(`/api/execute-sql`, {
        headers: {
          authorization: token,
        },
        params: {
          dbName,  
          fields,
          pivotTable,
          joinTable,
          joinCondition,
          joinType,
          whereCondition,
          orderBy,
          page,
          limit,
          noPagination
        },
      });

      // Extraer la información de paginación
      const { totalPages, totalRecords, firstRecordIndex, lastRecordIndex } = response.data;
      console.log(response.data);
      return {
        data: response.data,
        pagination: {
          totalPages,
          currentPage: noPagination ? 'Todos' : parseInt(page, 10),
          totalRecords,
          firstRecordIndex,
          lastRecordIndex,
        },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const apiSlice = createSlice({
  name: 'entities',
  initialState: {
    entities: [],
    status: 'idle',
    error: null,
    entity: null,
    executeSQLResult: null,  // Agregar un estado para los resultados de execute-sql
    pagination: null,         // Agregar un estado para la paginación
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(fetchEntities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchEntityById.fulfilled, (state, action) => {
        state.entity = action.payload;
      })
      .addCase(createEntity.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      })
      .addCase(deleteEntity.fulfilled, (state, action) => {
        const { id, message } = action.payload; // Supone que el backend envía el id
      
        if (id) {
          // Filtrar el registro eliminado
          state.entities = state.entities.filter((entity) => entity.id !== id);
          console.log(message); // Opcional: Mostrar el mensaje de éxito
        } else {
          console.log('No record was deleted:', message); // Manejo opcional para errores
        }
      })
      .addCase(updateEntity.fulfilled, (state, action) => {
        const { message, affectedRows } = action.payload;
        console.log("Affected Rows:", affectedRows, "Message:", message);

      })
      .addCase(fetchExecuteSQL.fulfilled, (state, action) => {
        state.executeSQLResult = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchExecuteSQL.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
