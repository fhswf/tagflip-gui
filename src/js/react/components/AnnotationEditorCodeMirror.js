import React, {Component} from "react";
import ReactDom from "react-dom";
import * as CodeMirrorReact from "react-codemirror";
import PropTypes from "prop-types";
import AnnotationPicker from "./AnnotationPicker";
import "./AnnotationEditorCodeMirror.scss"
import "./temp-maker.css"
import AnnotationHighlight from "./AnnotationHighlight";




const initialState = {
    text: testvalue,
    textSelected: false,
};


class AnnotationEditorCodeMirror extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this._onAnnotationPicked = this._onAnnotationPicked.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);

        this.editorRefCallback = element => {
            if (!this.editorRef) {
                this.editorRef = element;
                element.codeMirror.getWrapperElement().addEventListener("mouseup", this._onMouseUp);
                this.forceUpdate();
            }
        };
        this.activeMarkers = new Map();
    }

    componentWillUnmount() {
        // unmounting custom mount components
        for (let [t_id, marker] of this.activeMarkers.entries()) {
            ReactDom.unmountComponentAtNode(marker.container)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let deletedTags = new Set();
        let newTags = new Set();

        if (prevProps.tags.length < this.props.tags.length) {
            let prevTags = new Set(prevProps.tags.map(t => t.t_id));
            let currentTags = new Set(this.props.tags.map(t => t.t_id));

            newTags = new Set([...currentTags].filter(x => !prevTags.has(x)))
        } else if (prevProps.tags.length > this.props.tags.length) {
            let prevTags = new Set(prevProps.tags.map(t => t.t_id));
            let currentTags = new Set(this.props.tags.map(t => t.t_id));

            deletedTags = new Set([...prevTags].filter(x => !currentTags.has(x)))
        } else {
            let prevTags = new Set(prevProps.tags.map(t => t.t_id));
            let currentTags = new Set(this.props.tags.map(t => t.t_id));
            // console.log("prev: ", prevTags, "current:", currentTags)
            newTags = new Set([...currentTags].filter(x => !prevTags.has(x)))
            deletedTags = new Set([...prevTags].filter(x => !currentTags.has(x)))
        }

        newTags = this.props.tags.filter(x => newTags.has(x.t_id))
        deletedTags = prevProps.tags.filter(x => deletedTags.has(x.t_id))
        console.log("New: ", newTags, "Deleted:", deletedTags)

        this._renderTags(newTags, deletedTags)
    }

    _onMouseUp() {
        let codeMirror = this.editorRef.codeMirror;
        // console.log("_onMouseUp");
        if (codeMirror.somethingSelected()) {

            let selections = codeMirror.listSelections();
            if (selections.length === 1) {
                this.setState({
                    textSelected: true,
                    selectionFromIndex: codeMirror.indexFromPos(selections[0].anchor),
                    selectionToIndex: codeMirror.indexFromPos(selections[0].head),
                });
            }
        }
    }

    _onDelete(tag) {
        this.props.onDeleteTag(tag)
    }

    _onAnnotationPicked(annotation) { //annotation  has .a_id .color .name .s_id
        let codeMirror = this.editorRef.codeMirror;

        let startIndex = this.state.selectionFromIndex;
        let endIndex = this.state.selectionToIndex;

        if(endIndex < startIndex) {
            let helpIndex = startIndex;
            startIndex = endIndex;
            endIndex = helpIndex;
        }

        let newTag = {
            start_index: startIndex,
            end_index: endIndex,
            a_id: annotation.a_id,
            d_id: this.props.document.d_id
        };

        this.props.onSaveTag(newTag);
        this.setState({textSelected: false});
    }

    _cancelSelection() {
        let codeMirror = this.editorRef.codeMirror;
        codeMirror.setCursor(0, 0);
        this.setState({textSelected: ""})
    }

    _renderTags(newTags, deletedTags = new Set()) {
        if (!this.editorRef)
            return;

        let codeMirror = this.editorRef.codeMirror;

        if (deletedTags && deletedTags.length > 0) {
            for (let tag of deletedTags) {
                let marker = this.activeMarkers.get(tag.t_id)
                ReactDom.unmountComponentAtNode(marker.container);
                marker.marker.clear();
                this.activeMarkers.delete(tag.t_id)
            }
        }

        if (newTags && newTags.length > 0) {

            for (let tag of newTags) {
                let anchor = codeMirror.posFromIndex(tag.start_index)
                let head = codeMirror.posFromIndex(tag.end_index)

                let annotation = undefined;
                for (let a of this.props.annotations) {
                    if (a.a_id === tag.a_id) {
                        annotation = a;
                    }
                }
                if (!annotation) {
                    return;
                }

                let replacementContainer = document.createElement('span'); // this has to be here to handle click events ...
                let textMarker = codeMirror.markText(anchor, head, {
                    replacedWith: replacementContainer,
                    handleMouseEvents: true
                });
                codeMirror.setSelection(anchor, head)
                let text = codeMirror.getSelection();
                codeMirror.setCursor(0, 0);
                codeMirror.setSelection(codeMirror.posFromIndex(0), codeMirror.posFromIndex(0))

                this.activeMarkers.set(tag.t_id, {
                    marker: textMarker,
                    container: replacementContainer,
                    text: text,
                    flattenSpans: false
                });

                let reactElement = (
                    <AnnotationHighlight id={`hightlight-${tag.t_id}`}
                                         tag={tag}
                                         annotation={annotation}
                                         text={text}
                                         tooltip={"id: " + annotation.a_id}
                                         onDelete={() => this._onDelete(tag)}
                    />);
                ReactDom.render(reactElement, replacementContainer);
            }
        }
    }

    componentDidMount() {
        this._renderTags(this.props.tags)
    }

    render() {
        return (
            <React.Fragment>
                <AnnotationPicker textSelected={this.state.textSelected}
                                  annotations={this.props.annotations}
                                  onPicked={this._onAnnotationPicked}
                                  onCanceled={() => this._cancelSelection()}
                />
                <CodeMirrorReact
                    className="w-100 h-100"
                    ref={this.editorRefCallback}
                    value={this.props.document && this.props.document.text || ""}
                    options={{
                        lineNumbers: true,
                        readOnly: true,
                        lineWrapping: true
                    }}
                />
            </React.Fragment>
        );
    }

}

AnnotationEditorCodeMirror.propTypes = {
    annotations: PropTypes.array,
    document: PropTypes.object,
    tags: PropTypes.array,
    onSaveTag: PropTypes.func,
    onDeleteTag: PropTypes.func,
};

export default AnnotationEditorCodeMirror;
