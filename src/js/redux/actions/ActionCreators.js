import {fetchCorpora} from "./CorpusFetchActions";
import {
    setEditableCorpus,
    fetchCorpusAnnotationSets,
    updateCorpusField,
    toggleCorpusAnnotationSet
} from './CorpusEditActions';
import {fetchServerStatus} from './ServerStatusFetchActions';
import {fetchAnnotationSets, saveAnnotationSet} from "./AnnotationSetFetchActions";
import {setSelectedAnnotationSet} from "./AnnotationSetEditActions";

/**
 * Grouping up all possible actions.
 */
export const ActionCreators = Object.assign({},
    {
        fetchCorpora,
        setEditableCorpus,
        updateCorpusField,
        toggleCorpusAnnotationSet,
        fetchCorpusAnnotationSets,
        fetchServerStatus,
        fetchAnnotationSets,
        setSelectedAnnotationSet,
        saveAnnotationSet
    }
);