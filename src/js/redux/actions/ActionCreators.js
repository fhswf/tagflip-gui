import {fetchCorpora, deleteCorpus} from "./CorpusListActions";
import {
    setEditableCorpus,
    fetchCorpusAnnotationSets,
    updateCorpusField,
    toggleCorpusAnnotationSet,
    saveCorpus,
    reloadCorpus,
} from './CorpusEditActions';
import {fetchServerStatus} from './ServerStatusFetchActions';
import {fetchAnnotationSets, deleteAnnotationSet} from "./AnnotationSetListActions";
import {
    setEditableAnnotationSet,
    saveAnnotationSet,
    updateAnnotationSetField,
    reloadAnnotationSet,
    fetchAnnotations,
    deleteAnnotation,
    updateAnnotationField,
    saveAnnotation,
    setEditableAnnotation
} from "./AnnotationSetEditActions";

/**
 * Grouping up all possible actions.
 */
export const ActionCreators = Object.assign({},
    {
        fetchCorpora,
        deleteCorpus,
        setEditableCorpus,
        updateCorpusField,
        toggleCorpusAnnotationSet,
        fetchCorpusAnnotationSets,
        saveCorpus,
        reloadCorpus,
        fetchServerStatus,
        fetchAnnotationSets,
        deleteAnnotationSet,
        setEditableAnnotationSet,
        saveAnnotationSet,
        updateAnnotationSetField,
        reloadAnnotationSet,
        fetchAnnotations,
        saveAnnotation,
        updateAnnotationField,
        setEditableAnnotation,
        deleteAnnotation
    }
);