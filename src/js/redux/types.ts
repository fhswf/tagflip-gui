import FetchStatusType from "./actions/FetchStatusTypes";
import { Corpus } from '../Corpus';
import { AnnotationSet } from '../AnnotationSet';
import { Annotation } from '../Annotation';

export interface FetchState {
    didInvalidate: boolean;
    isFetching: boolean;
    lastUpdated: number;
    status: FetchStatusType;
    error: any;
}

export interface AnnotationSetListValue {
    items: AnnotationSet[];
}

export interface AnnotationSetValue {
    values: AnnotationSet;
    annotations: FetchState & {
        items: Annotation[];
        editableAnnotation: FetchState & {
            values: Annotation;
        }
    }
}

export interface DocumentListValue {
    items: any[];
}

export interface DocumentValue {
    item: any;
    tags: TagState;
}

export interface TagValue {
    items: any[];
}

export interface CorpusValue {
    values: Corpus;
    annotationSets: AnnotationSetListState;
    documents: DocumentListState;
    activeDocument: DocumentState;
}

export interface CorpusListValue {
    items: any[];
}

export interface ServerValue {
    available: boolean
}

export type AnnotationSetState = AnnotationSetValue & FetchState;
export type AnnotationSetListState = AnnotationSetListValue & FetchState;
export type DocumentListState = DocumentListValue & FetchState;
export type DocumentState = DocumentValue & FetchState;
export type TagState = TagValue & FetchState;
export type CorpusState = CorpusValue & FetchState;
export type CorpusListState = CorpusListValue & FetchState;
export type ServerState = ServerValue & FetchState;