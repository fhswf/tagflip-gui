// import React, {Component} from "react";
// import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
// import ListGroup from "react-bootstrap/ListGroup";
// import {connect, ConnectedProps} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {ActionCreators} from '../../../redux/actions/ActionCreators';
// import FileUpload from "../../components/FileUpload/FileUpload";
// import FetchPending from "../../components/FetchPending/FetchPending";
// import fetchStatusType from "../../../redux/actions/FetchStatusTypes";
// import {RootState} from "../../../redux/reducers/Reducers";
//
// const initialState = {
//     validated: false,
// };
//
// type State = typeof initialState;
//
// /**
//  * Maps redux state to component's props.
//  * @param state The redux state (reducers).
//  */
// function mapStateToProps(state: RootState) {
//     return {
//         corpus: state.activeCorpus.values,
//         isFetching: state.activeCorpus.isFetching,
//         annotationSets: state.activeCorpus.annotationSets,
//     };
// }
//
// /**
//  * Maps action creator functions to component's props.
//  * @param dispatch
//  */
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(ActionCreators, dispatch);
// }
//
// const connector = connect(mapStateToProps, mapDispatchToProps);
//
// type PropsFromRedux = ConnectedProps<typeof connector>
//
// type Props = PropsFromRedux & {
// }
//
// /**
//  * The view for importing a new corpus.
//  *
//  * @author Christian Gawron
//  */
// class CorpusImport extends Component<Props, State> {
//     /**
//      * Create a new CorpusImport component.
//      * @param props The properties of the component.
//      */
//     constructor(props: Props) {
//         super(props);
//         this.state = initialState;
//     }
//
//     /**
//      * React lifecycle method. Fetch all Annotation Sets.
//      */
//     componentDidMount() {
//         this.props.fetchAnnotationSets();
//     }
//
//     /**
//       * Get all available Annotation Sets to be rendered in a ListGroup.
//       * @returns {*} The AnnotationSets to be rendered with a selection option.
//       */
//     renderAnnotationSetSelection() {
//         const selectedAnnotationSetIds = new Set(this.props.annotationSets.items.map(annotationSet => annotationSet.annotationSetId));
//         let renderAnnotationSetList = () => {
//             return this.props.annotationSets.items.map(annotationSet => {
//                 return (
//
//                     <ListGroup.Item key={annotationSet.annotationSetId}>
//                         <Form.Check type="checkbox"
//                             defaultChecked={false}
//                             //onChange={() => this.props.toggleCorpusAnnotationSet(annotationSet)}
//                             label={annotationSet.name} />
//                     </ListGroup.Item>
//
//                 )
//             })
//         };
//
//         return (
//             <FetchPending
//                 isPending={this.props.annotationSets.isFetching}
//                 success={this.props.annotationSets.status === fetchStatusType.success}
//                 retryCallback={() => {
//                     this.props.fetchAnnotationSets();
//                 }}
//             >
//                 <ListGroup>
//                     {renderAnnotationSetList()}
//                 </ListGroup>
//             </FetchPending>
//         )
//     }
//
//     /**
//      * Render the CorpusDetails view.
//      * @returns {*} The component to be rendered.
//      */
//     render() {
//         return (
//             <React.Fragment>
//                 <h2>Import Corpus</h2>
//                 <Card className="mt-3">
//                     <Card.Body>
//                         <Card.Title>Upload Annotated Corpus</Card.Title>
//
//                         <Form.Group controlId="formName">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control type="text" placeholder="Name of the corpus"
//                                 name="name"
//                                 onChange={(e) => this.props.updateCorpusField('name', e.target.value)}
//                                 value={this.props.corpus.name}
//                                 required={true}
//                             />
//                             <Form.Control.Feedback type="invalid">
//                                 Please choose a name.
//                                     </Form.Control.Feedback>
//                         </Form.Group>
//                         < Form.Group controlId="formDescription">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control as="textarea" placeholder="Description of the corpus"
//                                 name="description"
//                                 onChange={(e) => this.props.updateCorpusField('description', e.target.value)}
//                                 value={this.props.corpus.description} />
//                         </Form.Group>
//
//                         {this.renderAnnotationSetSelection()}
//
//                         <FileUpload
//                             isUploading={this.props.isFetching}
//                             onUpload={(files) => this.props.uploadCorpus(files)}
//                             maxCount={1}
//                             uploadText="Drop TSV-File here... or just click..."
//                             acceptMimeTypes='text/plain, text/tab-separated-values, .tsv'
//                         />
//
//                     </Card.Body>
//                 </Card>
//
//             </React.Fragment>
//         );
//     }
// }
//
// export default connector(CorpusImport);