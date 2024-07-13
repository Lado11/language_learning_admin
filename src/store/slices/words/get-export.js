import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getExportService, getWordsExelService } from "../../../services/words/delete-exel-words";

const initialState = {
    exportGetLoading: false,
    exportGetResponse: null,
    exportGetError: null,
};
export const exportGetThunk = createAsyncThunk(
    "exportGet",
    async (data, { rejectWithValue }) => {
        try {
            const response = await getExportService(data);
            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            let filename = 'download.xlsx'; // Default filename

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1].replace(/['"]/g, '').trim(); // Remove any quotes and trim whitespace
                }
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return { success: true }; // Return a serializable response
        } catch (error) {
            console.error("Error downloading file:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const exportGetSlice = createSlice({
    name: "exportGetSlice",
    initialState,
    reducers: {
        GetWordsGetResponse: (state) => {
            state.wordsGetResponse = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(exportGetThunk.pending, (state) => {
            state.exportGetLoading = true;
        });
        builder.addCase(exportGetThunk.fulfilled, (state, { payload }) => {
            state.exportGetLoading = false;
            state.exportGetResponse = payload;
        });
        builder.addCase(exportGetThunk.rejected, (state, { payload }) => {
            state.exportGetLoading = false;
            state.exportGetError = payload;
        });
    },
});

export const { GetWordsGetResponse } = exportGetSlice.actions;


export const exportGetLoading = (state) => {
    return state.exportGetSlice.exportGetLoading;
};

export const exportGetResponse = (state) => {
    return state.exportGetSlice.exportGetResponse;
};

export const exportGetError = (state) => {
    return state.exportGetSlice.exportGetError;
};
