import React, { Component} from 'react';
import { reduxForm, Field } from  'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrentUser } from '../actions/index';

class Enter extends Component {

  constructor(props){
    super(props);
    this.state =
    {value: 'israel'};
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.email){
      if(this.props.email !== "lies"){
        this.props.history.push(`/index/${this.props.email}`)}
      !this.state.error && this.setState({error: "email or password do not match!"});
  }
}

renderComponent(field){
  return(
    <div>
    <label>{field.label}</label>
    <input type={field.type}  pattern={field.type === "email" && ".+@veriests.com"}
    title={field.type === "email" && "please insert correct email!"} {...field.input}/>
    <div className="error">
      {field.meta.touched ? field.meta.error : ''}
    </div>
    </div>

  );
}

change(event){
  this.setState({value: event.target.value});
}

onSubmit(values){
  values.office = this.state.value;
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
      <Field
      label="Password"
      name="password"
      type="password"
      component={this.renderComponent}
      />
      <Field
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      component={this.renderComponent}
      />
      <div>
          <label>office</label>
          <div>
            <select  onChange={this.change.bind(this)}>
              <option value="israel">israel</option>
              <option value="serbia">serbia</option>
            </select>
          </div>
        </div>
      <button type="submit" >enter</button>
      {this.state.error && (<div>{this.state.error}</div>)}
      </form>
    );
  }
}

function validate(values){
  const errors= {};
  if(!values.email){
    errors.email = "please enter a vaild email !"
  }
  if(!values.password || !values.confirmPassword ){
    errors.confirmPassword = "plase insert password and confirm it"
  }
  if(values.confirmPassword !== values.password){
    errors.confirmPassword = "passwords do not match!"
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
