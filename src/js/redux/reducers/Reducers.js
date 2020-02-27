import * as corpusFetchReducers from './CorpusListReducers';
import * as corpusEditReducers from './CorpusEditReducers';
import * as serverStatusFetchReducers from './ServerStatusFetchReducers';
import * as annotationSetFetchReducers from './AnnotationSetListReducers';
import * as annotationSetEditReducers from './AnnotationSetEditReducers';
import * as annotationEditReducers from './AnnotationEditReducers';
import * as documentTaggingReducers from './DocumentTaggingReducers';

//import produce from 'immer';
import {combineReducers} from "redux";

// Combine all reducers of the application
const reducers = combineReducers(Object.assign({},
    corpusFetchReducers, corpusEditReducers, serverStatusFetchReducers, annotationSetFetchReducers,
    annotationSetEditReducers, annotationEditReducers, documentTaggingReducers
));

export default reducers;