
const LOADING = {
  isLoading: true,
  isLoaded: false,
  error: null,
};



const LOADING_SUCCESS = {
  isLoading: false,
  isLoaded: true,
};
const LOADING_FAILED = {
  isLoading: false,
  isLoaded: false,
};

const SAVING = {
  isSaving: true,
  isSaved: false,
  error: null,
};

const SAVING_SUCCESS = {
  isSaving: false,
  isSaved: true,
};
const SAVING_FAILED = {
  isSaving: false,
  isSaved: false,
};

const UPLOADING = {
  isUploading: true,
  isUploaded: false,
};

const UPLOADING_SUCCESS = {
  isUploading: false,
  isUploaded: true,
};

const UPLOADING_FAILED = {
  isUploading: false,
  isUploaded: false,
};

export default {
  LOADING,
  LOADING_SUCCESS,
  LOADING_FAILED,
  SAVING,
  SAVING_SUCCESS,
  SAVING_FAILED,
  UPLOADING,
  UPLOADING_SUCCESS,
  UPLOADING_FAILED,
};
