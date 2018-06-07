import React, { Component} from 'react';
import { reduxForm, Field } from  'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrentUser } from '../actions/index';
import './css/enter.css';

class Sign extends Component {

  constructor(props){
    super(props);
    this.state =
    {value: 'israel'};
  }


  componentDidUpdate(prevProps, prevState){
    if(this.props.email){
      if(this.props.email !== "lies"){
        this.props.history(`/index/${this.props.email}`)}
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
  this.setState({clicked: true});
}

  render(){
    const { handleSubmit } = this.props;
    return(
      <div className='enter'>
        <div className='box'>
          <div className='signIn'>Sign Up</div>
          <form className='form' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Email: "
              name="email"
              type="email"
              component = {this.renderComponent}
            />
            <Field
            label="Password: "
            name="password"
            type="password"
            component={this.renderComponent}
            /><Field
              label="Confirm Password: "
              name="confirmPassword"
              type="password"
              component={this.renderComponent}
              />
            <div>
                  <label>Office: </label>
                  <select className="office" onChange={this.change.bind(this)}>
                    <option value="israel">Israel</option>
                    <option value="serbia">Serbia</option>
                  </select>
            </div>
            {this.props.email && this.props.email === "lies" && this.state.clicked && (<div className="error">email or password do not match!</div>)}
            <button type="submit" >enter</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values, props){
  const errors= {};
  if(!values.email){
    errors.email = "please enter a vaild email !";
  }
  if(!values.password || !values.confirmPassword){
    errors.confirmPassword = "plase insert password and confirm it";
  }
  if(values.confirmPassword !== values.password){
    errors.confirmPassword = "passwords do not match!";
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
})(connect(mapStateToProps, mapDispatchToProps)(Sign));
