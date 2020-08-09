import createReducer from './CreateReducer'
import * as CorpusEditActions from '../actions/CorpusActions'
import FetchStatusType from "../actions/FetchStatusTypes";
import { Corpus } from '../../Corpus';
import { CorpusState } from '../types';

const initialState: CorpusState = {
    values: {
        c_id: 0,
        name: "",
        description: "",
    },
    didInvalidate: false,
    isFetching: false,
    lastUpdated: undefined,
    status: FetchStatusType.success,
    error: null,
    annotationSets: {
        items: [],
        isFetching: false,
        didInvalidate: false,
        lastUpdated: undefined,
        status: FetchStatusType.success,
        error: null
    },
    documents: {
        isFetching: false,
        didInvalidate: false,
        items: [],
        lastUpdated: undefined,
        status: FetchStatusType.success,
        error: null
    },
    activeDocument: {
        isFetching: false,
        didInvalidate: true,
        item: null,
        lastUpdated: undefined,
        status: FetchStatusType.success,
        error: null,
        tags: {
            isFetching: false,
            didInvalidate: true,
            items: [],
            lastUpdated: undefined,
            status: FetchStatusType.success,
            error: null,
        }
    }
};

//@see https://www.pluralsight.com/guides/deeply-nested-objectives-redux
/**
 * The currently selected Corpus object to be edited.
 * Besides information about the corpus itself, it holds information about its corresponding data, such as the
 * associated AnnotaionSets, Documents, and the currently selected Document with all its Tags.
 * @type {reducer}
 */
export const editableCorpus = createReducer(initialState, {
    [CorpusEditActions.SET_EDITABLE_CORPUS]: (draft: CorpusState, action) => {
        draft.values = action.corpus;
        draft.didInvalidate = true;
        draft.annotationSets.didInvalidate = true;
        draft.documents.didInvalidate = true;
        draft.activeDocument.didInvalidate = true;
        draft.activeDocument.tags.didInvalidate = true;
    },
    [CorpusEditActions.UPDATE_CORPUS_FIELD]: (draft: CorpusState, action) => {
        draft.values[action.field] = action.value;
    },
    [CorpusEditActions.ADD_CORPUS_ANNOTATION_SET]: (draft, action) => {
        draft.annotationSets.items.push(action.annotationSet); // add
    },
    [CorpusEditActions.REMOVE_CORPUS_ANNOTATION_SET]: (draft, action) => {
        if (draft.annotationSets.items.map(a => a.s_id).includes(action.annotationSet.s_id)) { // set is selected
            draft.annotationSets.items = draft.annotationSets.items.filter(a => a.s_id !== action.annotationSet.s_id)        // remove
        }
    },
    [CorpusEditActions.REQUEST_CORPUS_ANNOTATION_SETS](draft, action) {
        draft.annotationSets.isFetching = true;
    },
    [CorpusEditActions.INVALIDATE_CORPUS_ANNOTATION_SETS](draft, action) {
        draft.annotationSets.didInvalidate = true;
    },
    [CorpusEditActions.RECEIVE_CORPUS_ANNOTATION_SETS](draft, action) {
        draft.annotationSets.isFetching = false;
        draft.annotationSets.didInvalidate = false;
        if (action.status === FetchStatusType.success) {
            draft.annotationSets.items = action.annotationSets;
            draft.annotationSets.lastUpdated = action.receivedAt;
            draft.annotationSets.status = FetchStatusType.success;
            draft.annotationSets.error = null;
        } else {
            draft.annotationSets.isFetching = false;
            draft.annotationSets.didInvalidate = false;
            draft.annotationSets.status = FetchStatusType.error;
            draft.annotationSets.error = action.error;
        }
    },

    [CorpusEditActions.REQUEST_UPDATE_CORPUS](draft, action) {
        draft.isFetching = true;
    },
    [CorpusEditActions.RECEIVE_UPDATE_CORPUS](draft, action) {
        draft.isFetching = false;
        draft.didInvalidate = false;
        if (action.status === FetchStatusType.success) {
            draft.values = action.corpus;
            draft.lastUpdated = action.receivedAt;
            draft.status = FetchStatusType.success;
            draft.error = null;
        } else {
            draft.isFetching = false;
            draft.status = FetchStatusType.error;
            draft.error = action.error;
        }
    },

    [CorpusEditActions.REQUEST_CORPUS_DOCUMENTS](draft, action) {
        draft.documents.isFetching = true;
    },
    [CorpusEditActions.INVALIDATE_CORPUS_DOCUMENTS](draft, action) {
        draft.documents.didInvalidate = true;
    },
    [CorpusEditActions.RECEIVE_CORPUS_DOCUMENTS](draft, action) {
        draft.documents.isFetching = false;
        draft.documents.didInvalidate = false;
        if (action.status === FetchStatusType.success) {
            draft.documents.items = action.documents;
            draft.documents.lastUpdated = action.receivedAt;
            draft.documents.status = FetchStatusType.success;
            draft.documents.error = null;
        } else {
            draft.documents.isFetching = false;
            draft.documents.didInvalidate = false;
            draft.documents.status = FetchStatusType.error;
            draft.documents.error = action.error;
        }
    },

    [CorpusEditActions.REQUEST_CORPUS_IMPORT](draft, action) {
        draft.isFetching = true;
    },

    [CorpusEditActions.REQUEST_CORPUS_UPLOAD_DOCUMENTS](draft, action) {
        draft.documents.isFetching = true;
    },

    [CorpusEditActions.RECEIVE_CORPUS_UPLOAD_DOCUMENTS](draft, action) {
        draft.documents.isFetching = false;
        draft.documents.didInvalidate = false;
        draft.documents.items.push(...action.documents);
        if (action.skippedDocuments.length !== 0) {
            draft.documents.status = FetchStatusType.warning;
            draft.documents.error = "Could not process all documents."
            for (let doc of action.skippedDocuments) {
                draft.documents.error = draft.documents.error.concat("\n");
                draft.documents.error = draft.documents.error.concat(doc.item.filename).concat(": ").concat(doc.reason)
            }
        } else {
            draft.documents.status = FetchStatusType.success;
            draft.documents.error = null;
        }
    },

    [CorpusEditActions.CORPUS_DELETE_DOCUMENT](draft, action) {
        draft.documents.items = draft.documents.items.filter(x => x.d_id !== action.documentId)
    },

    [CorpusEditActions.REQUEST_CORPUS_DOCUMENT](draft, action) {
        draft.activeDocument.isFetching = true;
        draft.activeDocument.item = null;
    },
    [CorpusEditActions.RECEIVE_CORPUS_DOCUMENT](draft, action) {
        draft.activeDocument.isFetching = false;
        draft.activeDocument.didInvalidate = false;
        if (action.status === FetchStatusType.success) {
            draft.activeDocument.item = action.document;
            draft.activeDocument.lastUpdated = action.receivedAt;
            draft.activeDocument.status = FetchStatusType.success;
            draft.activeDocument.error = null;
        } else {
            draft.activeDocument.lastUpdated = action.receivedAt;
            draft.activeDocument.status = FetchStatusType.error;
            draft.activeDocument.error = action.error;
        }
    },
    [CorpusEditActions.REQUEST_TAGS_FOR_ACTIVE_DOCUMENT](draft, action) {
        draft.activeDocument.tags.isFetching = true;
        draft.activeDocument.tags.didInvalidate = true;
    },
    [CorpusEditActions.RECEIVE_TAGS_FOR_ACTIVE_DOCUMENT](draft, action) {
        draft.activeDocument.tags.isFetching = false;
        draft.activeDocument.tags.didInvalidate = false;
        if (action.status === FetchStatusType.success) {
            draft.activeDocument.tags.items = action.tags;
            draft.activeDocument.tags.lastUpdated = action.receivedAt;
            draft.activeDocument.tags.status = FetchStatusType.success;
            draft.activeDocument.tags.error = null;
        } else {
            draft.activeDocument.tags.lastUpdated = action.receivedAt;
            draft.activeDocument.tags.status = FetchStatusType.error;
            draft.activeDocument.tags.error = action.error;
        }
    },
    [CorpusEditActions.REQUEST_SAVE_TAG](draft, action) {
        draft.activeDocument.tags.isFetching = false;
        draft.activeDocument.tags.didInvalidate = true;
    },
    [CorpusEditActions.RECEIVE_SAVE_TAG](draft, action) {
        draft.activeDocument.tags.isFetching = false;
        draft.activeDocument.tags.didInvalidate = false;
        if (action.status === FetchStatusType.success) {
            draft.activeDocument.tags.items.push(action.tag);
            draft.activeDocument.tags.lastUpdated = action.receivedAt;
            draft.activeDocument.tags.status = FetchStatusType.success;
            draft.activeDocument.tags.error = null;
        } else {
            draft.activeDocument.tags.lastUpdated = action.receivedAt;
            draft.activeDocument.tags.status = FetchStatusType.error;
            draft.activeDocument.tags.error = action.error;
        }
    },
    [CorpusEditActions.REQUEST_DELETE_TAG](draft, action) {
        draft.activeDocument.tags.isFetching = false;
        draft.activeDocument.tags.didInvalidate = true;
    },
    [CorpusEditActions.RECEIVE_DELETE_TAG](draft, action) {
        draft.activeDocument.tags.isFetching = false;
        draft.activeDocument.tags.didInvalidate = false;
        if (action.status === FetchStatusType.success) {
            draft.activeDocument.tags.items = draft.activeDocument.tags.items.filter(x => x.t_id !== action.tagId);
            draft.activeDocument.tags.lastUpdated = action.receivedAt;
            draft.activeDocument.tags.status = FetchStatusType.success;
            draft.activeDocument.tags.error = null;
        } else {
            draft.activeDocument.tags.lastUpdated = action.receivedAt;
            draft.activeDocument.tags.status = FetchStatusType.error;
            draft.activeDocument.tags.error = action.error;
        }
    }

});