import React from "react";
import M from "materialize-css";

export default class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  componentDidUpdate() {
    if(this.props.confirmText){
      const instance = M.Modal.init(this.modalRef.current, {
        onCloseEnd: ()=>{
instance.destroy();
        }
      });
      instance.open();
    }

  }

  render() {
    return (
      <div ref={this.modalRef} className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Confirm Delete</h4>
          <p>{this.props.confirmText}</p>
        </div>
        <div className="modal-footer">
          <button onClick={this.props.onAgree} className="modal-close waves-effect waves-green btn-flat">
            Agree
          </button>
        </div>
      </div>
    );
  }
}
