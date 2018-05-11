import React, { Component} from 'react';
import { reduxForm, Field } from  'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrentUser } from '../actions/index';

class Enter extends Component {

  componentDidUpdate(prevProps, prevState){
    this.props.email && this.props.history.push(`/index/${this.props.email}`);
  }

renderComponent(field){
  return(
    <div>
    <label>{field.label}</label>
    <input type={field.type} pattern=".+@veriests.com"
    title="please insert correct email!" {...field.input}/>
    <div className="error">
      {field.meta.touched ? field.meta.error : ''}
    </div>
    </div>

  );
}

renderSelect(field){
return(
  <div>
  <select {...field.input}>
  {field.children}
  </select>
  <div className="error">
    {field.meta.touched ? field.meta.error : ''}
  </div>
  </div>
);
}

onSubmit(values){
  this.props.fetchCurrentUser(values);
}

  render(){
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <Field
        label="Email"
        name="email"
        type="email"
        component = {this.renderComponent}
      />
      <div>
          <label>office</label>
          <div>
            <Field name="office" component={this.renderSelect}>
              <option />
              <option value="israel">israel</option>
              <option value="serbia">serbia</option>
              <option value="both">both</option>
            </Field>
          </div>
        </div>
      <button type="submit" >enter</button>
      </form>
    );
  }
}

function validate(values){
  const errors= {};
  if(!values.email){
    errors.email = "please enter a vaild email !"
  }
  if(!values.office){
    errors.office = "please choose your office !"
  }
  return errors;
}

function mapStateToProps(state){
  return{
    email: state.currentUser.email
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchCurrentUser}, dispatch);
}

export default reduxForm({
  validate,
  form:"enterForm"
})(connect(mapStateToProps, mapDispatchToProps)(Enter));
