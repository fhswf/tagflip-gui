import {fetchCorpora, deleteCorpus} from "./CorpusListActions";
import {
    setEditableCorpus,
    fetchCorpusAnnotationSets,
    updateCorpusField,
    toggleCorpusAnnotationSet,
    saveCorpus,
    reloadCorpus,
    fetchCorpusDocuments,
    uploadCorpusDocuments,
    deleteCorpusDocument,
    fetchCorpusDocument,
} from './CorpusActions';
import {fetchServerStatus} from './ServerStatusFetchActions';
import {fetchAnnotationSets, deleteAnnotationSet} from "./AnnotationSetListActions";
import {
    setActiveAnnotationSet,
    saveAnnotationSet,
    updateAnnotationSetField,
    reloadAnnotationSet,
    fetchAnnotations,
    deleteAnnotation,
    updateAnnotationField,
    saveAnnotation,
    setEditableAnnotation
} from "./AnnotationSetActions";
import {setTagableDocument} from "./DocumentTaggingActions";


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
        fetchCorpusDocuments,
        fetchCorpusDocument,
        deleteCorpusDocument,
        uploadCorpusDocuments,
        fetchServerStatus,
        fetchAnnotationSets,
        deleteAnnotationSet,
        saveAnnotationSet,
        updateAnnotationSetField,
        reloadAnnotationSet,
        fetchAnnotations,
        saveAnnotation,
        updateAnnotationField,
        setEditableAnnotation,
        deleteAnnotation,
        setTagableDocument,
        setActiveAnnotationSet
    }
);