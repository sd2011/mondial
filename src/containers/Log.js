import React, { Component} from 'react';
import { reduxForm, Field } from  'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrentUser } from '../actions/index';
import './css/enter.css';

class Log extends Component {

  constructor(props){
    super(props);
    this.state= {}

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


onSubmit(values){
  this.props.fetchCurrentUser(values);
  this.setState({clicked: true})
}

  render(){
    const { handleSubmit } = this.props;

    return(
      <div className='enter'>
        <div className='box'>
          <div className='signIn'>Log In</div>
          <form className='form' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Email: "
              name="logEmail"
              type="email"
              component = {this.renderComponent}
            />
            <Field
            label="Password: "
            name="logPassword"
            type="password"
            component={this.renderComponent}
            />
            {this.props.email && this.state.clicked && (<div>email or password do not match!</div>)}
            <button type="submit" >enter</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values){
  const errors= {};
  if(!values.logEmail){
    errors.logEmail = "please enter a vaild email !";
  }
  if(!values.logPassword){
    errors.logPassword = "plase insert password and confirm it";
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
  form:"logForm"
})(connect(mapStateToProps, mapDispatchToProps)(Log));
